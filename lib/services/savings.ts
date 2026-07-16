import type { OrderStatus } from "@/types";

export const MAX_ORDER_MEMBERS = 10;

export function roundCurrency(value: number): number {
  return Math.round(value * 100) / 100;
}

export function getDeliveryCostPerPerson(
  estimatedDeliveryFee: number | null,
  participantCount: number,
): number | null {
  if (estimatedDeliveryFee === null || participantCount <= 0) {
    return null;
  }

  return roundCurrency(estimatedDeliveryFee / participantCount);
}

export function getEstimatedSavings(
  estimatedDeliveryFee: number | null,
  participantCount: number,
): number | null {
  const deliveryCostPerPerson = getDeliveryCostPerPerson(estimatedDeliveryFee, participantCount);

  if (estimatedDeliveryFee === null || deliveryCostPerPerson === null) {
    return null;
  }

  return roundCurrency(estimatedDeliveryFee - deliveryCostPerPerson);
}

export function getRemainingSlots(participantCount: number): number {
  return Math.max(MAX_ORDER_MEMBERS - participantCount, 0);
}

export function getOrderStatus(input: {
  closedAt: string | null;
  expiresAt: string;
  participantCount: number;
  now?: Date;
}): OrderStatus {
  if (input.closedAt !== null) {
    return "CLOSED";
  }

  if (new Date(input.expiresAt).getTime() <= (input.now ?? new Date()).getTime()) {
    return "EXPIRED";
  }

  if (input.participantCount >= MAX_ORDER_MEMBERS) {
    return "FULL";
  }

  return "OPEN";
}
