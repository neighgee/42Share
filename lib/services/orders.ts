import "server-only";

import { getSupabaseAdmin } from "@/lib/database/supabase";
import {
  getDeliveryCostPerPerson,
  getEstimatedSavings,
  getOrderStatus,
  getRemainingSlots,
  MAX_ORDER_MEMBERS,
} from "@/lib/services/savings";
import type { CreateOrderInput } from "@/lib/validation/orders";
import type { OrderDetails, OrderSummary } from "@/types";

type CreatorRow = {
  id: number;
  login: string;
  display_name: string;
  avatar_url: string | null;
};

type OrderMemberRow = {
  user_id: number;
};

type OrderRow = {
  id: string;
  creator_id: number;
  restaurant: string;
  group_order_url: string;
  estimated_delivery_fee: number | string | null;
  notes: string | null;
  expires_at: string;
  closed_at: string | null;
  created_at: string;
  creator: CreatorRow;
  order_members: OrderMemberRow[];
};

export class ServiceError extends Error {
  constructor(
    public readonly code:
      | "ALREADY_JOINED"
      | "ORDER_FULL"
      | "ORDER_CLOSED"
      | "ORDER_EXPIRED"
      | "ORDER_NOT_FOUND"
      | "FORBIDDEN"
      | "INTERNAL_SERVER_ERROR",
    message: string,
  ) {
    super(message);
  }
}

function toNumber(value: number | string | null): number | null {
  if (value === null) {
    return null;
  }

  return typeof value === "number" ? value : Number(value);
}

function mapOrder(row: OrderRow, userId?: number): OrderDetails {
  const estimatedDeliveryFee = toNumber(row.estimated_delivery_fee);
  const participantCount = row.order_members.length;
  const status = getOrderStatus({
    closedAt: row.closed_at,
    expiresAt: row.expires_at,
    participantCount,
  });

  return {
    id: row.id,
    restaurant: row.restaurant,
    groupOrderUrl: row.group_order_url,
    estimatedDeliveryFee,
    participantCount,
    remainingSlots: getRemainingSlots(participantCount),
    deliveryCostPerPerson: getDeliveryCostPerPerson(estimatedDeliveryFee, participantCount),
    estimatedSavings: getEstimatedSavings(estimatedDeliveryFee, participantCount),
    expiresAt: row.expires_at,
    createdAt: row.created_at,
    status,
    notes: row.notes,
    isMember: userId ? row.order_members.some((member) => member.user_id === userId) : false,
    creator: {
      id: row.creator.id,
      login: row.creator.login,
      displayName: row.creator.display_name,
      avatarUrl: row.creator.avatar_url,
    },
  };
}

function mapSummary(row: OrderRow, userId?: number): OrderSummary {
  const details = mapOrder(row, userId);

  return {
    id: details.id,
    restaurant: details.restaurant,
    estimatedDeliveryFee: details.estimatedDeliveryFee,
    participantCount: details.participantCount,
    remainingSlots: details.remainingSlots,
    deliveryCostPerPerson: details.deliveryCostPerPerson,
    estimatedSavings: details.estimatedSavings,
    expiresAt: details.expiresAt,
    status: details.status,
    notes: details.notes,
    isMember: details.isMember,
    creator: details.creator,
  };
}

function orderSelect() {
  return `
    id,
    creator_id,
    restaurant,
    group_order_url,
    estimated_delivery_fee,
    notes,
    expires_at,
    closed_at,
    created_at,
    creator:users!orders_creator_id_fkey (
      id,
      login,
      display_name,
      avatar_url
    ),
    order_members (
      user_id
    )
  `;
}

function todaySingaporeUtcRange(): { start: string; end: string } {
  const now = new Date();
  const singaporeNow = new Date(now.getTime() + 8 * 60 * 60 * 1000);
  const year = singaporeNow.getUTCFullYear();
  const month = singaporeNow.getUTCMonth();
  const day = singaporeNow.getUTCDate();
  const start = new Date(Date.UTC(year, month, day) - 8 * 60 * 60 * 1000);
  const end = new Date(start.getTime() + 24 * 60 * 60 * 1000);

  return {
    start: start.toISOString(),
    end: end.toISOString(),
  };
}

export async function listOpenOrders(userId?: number): Promise<OrderSummary[]> {
  const supabase = getSupabaseAdmin();
  const { data, error } = await supabase
    .from("orders")
    .select(orderSelect())
    .is("closed_at", null)
    .gt("expires_at", new Date().toISOString())
    .order("expires_at", { ascending: true });

  if (error) {
    throw new Error("Unable to retrieve orders.");
  }

  return ((data ?? []) as unknown as OrderRow[])
    .map((row) => mapSummary(row, userId))
    .filter((order) => order.status === "OPEN");
}

export async function listRecentOrders(userId?: number): Promise<OrderSummary[]> {
  const supabase = getSupabaseAdmin();
  const range = todaySingaporeUtcRange();
  const { data, error } = await supabase
    .from("orders")
    .select(orderSelect())
    .gte("created_at", range.start)
    .lt("created_at", range.end)
    .order("created_at", { ascending: false });

  if (error) {
    throw new Error("Unable to retrieve recent orders.");
  }

  return ((data ?? []) as unknown as OrderRow[])
    .map((row) => mapSummary(row, userId))
    .filter((order) => order.status !== "OPEN");
}

export async function getOrderById(orderId: string, userId: number): Promise<OrderDetails> {
  const supabase = getSupabaseAdmin();
  const { data, error } = await supabase
    .from("orders")
    .select(orderSelect())
    .eq("id", orderId)
    .maybeSingle();

  if (error) {
    throw new Error("Unable to retrieve order.");
  }

  if (!data) {
    throw new ServiceError("ORDER_NOT_FOUND", "Order not found.");
  }

  return mapOrder(data as unknown as OrderRow, userId);
}

export async function createOrder(
  input: CreateOrderInput,
  creatorId: number,
): Promise<OrderDetails> {
  const supabase = getSupabaseAdmin();
  const expiresAt = new Date(Date.now() + input.expiryMinutes * 60 * 1000).toISOString();
  const { data: created, error: orderError } = await supabase
    .from("orders")
    .insert({
      creator_id: creatorId,
      restaurant: input.restaurant,
      group_order_url: input.groupOrderUrl,
      estimated_delivery_fee: input.estimatedDeliveryFee,
      notes: input.notes,
      expires_at: expiresAt,
    })
    .select("id")
    .single();

  if (orderError || !created) {
    throw new Error("Unable to create order.");
  }

  const { error: memberError } = await supabase.from("order_members").insert({
    order_id: created.id,
    user_id: creatorId,
  });

  if (memberError) {
    await supabase
      .from("orders")
      .update({ closed_at: new Date().toISOString() })
      .eq("id", created.id);
    throw new Error("Unable to register organiser.");
  }

  return getOrderById(created.id, creatorId);
}

export async function closeOrder(orderId: string, userId: number): Promise<OrderDetails> {
  const order = await getOrderById(orderId, userId);

  if (order.creator.id !== userId) {
    throw new ServiceError("FORBIDDEN", "Only the organiser can close this order.");
  }

  if (order.status !== "OPEN") {
    throw new ServiceError(
      order.status === "EXPIRED" ? "ORDER_EXPIRED" : "ORDER_CLOSED",
      "This order is no longer open.",
    );
  }

  const supabase = getSupabaseAdmin();
  const { error } = await supabase
    .from("orders")
    .update({ closed_at: new Date().toISOString() })
    .eq("id", orderId)
    .eq("creator_id", userId)
    .is("closed_at", null);

  if (error) {
    throw new Error("Unable to close order.");
  }

  return getOrderById(orderId, userId);
}

export async function joinOrder(orderId: string, userId: number): Promise<OrderDetails> {
  const order = await getOrderById(orderId, userId);

  if (order.isMember) {
    throw new ServiceError("ALREADY_JOINED", "You have already joined this order.");
  }

  if (order.status === "CLOSED") {
    throw new ServiceError("ORDER_CLOSED", "This order is closed.");
  }

  if (order.status === "EXPIRED") {
    throw new ServiceError("ORDER_EXPIRED", "This order has expired.");
  }

  if (order.participantCount >= MAX_ORDER_MEMBERS || order.status === "FULL") {
    throw new ServiceError("ORDER_FULL", "This order is already full.");
  }

  const supabase = getSupabaseAdmin();
  const { error } = await supabase.from("order_members").insert({
    order_id: orderId,
    user_id: userId,
  });

  if (error?.code === "23505") {
    throw new ServiceError("ALREADY_JOINED", "You have already joined this order.");
  }

  if (error) {
    throw new Error("Unable to join order.");
  }

  const updated = await getOrderById(orderId, userId);

  if (updated.participantCount >= MAX_ORDER_MEMBERS && updated.status === "FULL") {
    return updated;
  }

  return updated;
}
