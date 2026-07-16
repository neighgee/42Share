import Image from "next/image";
import Link from "next/link";
import { CountdownBadge } from "@/components/order/CountdownBadge";
import { ParticipantBadge } from "@/components/order/ParticipantBadge";
import { getRestaurantVisual } from "@/lib/restaurant-visuals";
import { getDeliveryCostPerPerson, getEstimatedSavings } from "@/lib/services/savings";
import { formatCurrency } from "@/lib/utils";
import type { OrderSummary } from "@/types";

export function OrderCard({
  order,
  readonly = false,
}: {
  order: OrderSummary;
  readonly?: boolean;
}) {
  const statusText = getStatusText(order);
  const restaurantVisual = getRestaurantVisual(order.restaurant);
  const savingsIfJoined =
    order.status === "OPEN" && !order.isMember
      ? getEstimatedSavings(order.estimatedDeliveryFee, order.participantCount + 1)
      : null;
  const isJoinOpportunity = order.status === "OPEN" && !order.isMember;

  return (
    <article className="grid gap-4 rounded-2xl border border-border bg-white p-5 shadow-card transition duration-200 hover:-translate-y-0.5 hover:border-cyan-200 hover:shadow-lift sm:p-6">
      <div className="flex items-center gap-5">
        {restaurantVisual ? (
          <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-2xl bg-stone-100 shadow-sm ring-1 ring-black/5">
            <Image
              src={restaurantVisual.imageSrc}
              alt={restaurantVisual.imageAlt}
              fill
              sizes="80px"
              className="object-cover"
              style={{ objectPosition: restaurantVisual.objectPosition }}
            />
            <span className="absolute bottom-1.5 left-1.5 grid h-6 min-w-6 place-items-center rounded-lg bg-white/90 px-1.5 text-[10px] font-black uppercase text-stone-800 shadow-sm backdrop-blur">
              {order.restaurant.slice(0, 2)}
            </span>
          </div>
        ) : null}
        <div className="grid gap-1">
          <h3 className="text-3xl font-bold tracking-tight text-stone-900">{order.restaurant}</h3>
          <p className="text-base text-stone-500">
            Hosted by <span className="font-medium text-stone-700">{order.creator.login}</span>
          </p>
        </div>
      </div>

      <ParticipantBadge count={order.participantCount} />

      <div
        className={`flex flex-col gap-4 rounded-xl px-5 py-4 text-base sm:flex-row sm:items-center sm:justify-between ${
          isJoinOpportunity ? "border border-cyan-200 bg-cyan-50" : "bg-stone-50"
        }`}
      >
        <div className="grid gap-1">
          <p
            className={
              isJoinOpportunity ? "font-bold text-brand-dark" : "font-semibold text-stone-900"
            }
          >
            {statusText.title}
          </p>
          {statusText.detail ? (
            <p className={isJoinOpportunity ? "text-brand-dark/75" : "text-stone-500"}>
              {statusText.detail}
            </p>
          ) : null}
        </div>
        {!readonly && savingsIfJoined !== null ? (
          <Link
            href={`/orders/${order.id}#join-order`}
            className="inline-flex h-12 shrink-0 items-center justify-center rounded-xl bg-brand px-5 font-bold text-white shadow-sm transition hover:-translate-y-0.5 hover:bg-brand-dark hover:shadow-md"
          >
            Join &amp; save {formatCurrency(savingsIfJoined)}
          </Link>
        ) : null}
      </div>

      {order.notes ? (
        <p className="rounded-xl border border-cyan-100 bg-cyan-50/70 px-5 py-4 text-base text-stone-600">
          {order.notes}
        </p>
      ) : null}

      <div className="flex items-center justify-between gap-3 pt-1 text-base text-stone-500">
        <span>
          {order.status === "OPEN" ? "Closing in " : "Status "}
          {order.status === "OPEN" ? <CountdownBadge expiresAt={order.expiresAt} /> : order.status}
        </span>
        {!readonly && order.status === "OPEN" ? (
          <Link
            href={`/orders/${order.id}`}
            className="rounded-lg bg-brand-soft px-4 py-2.5 font-semibold text-brand-dark transition hover:bg-cyan-100"
          >
            View Details
          </Link>
        ) : null}
      </div>
    </article>
  );
}

function getStatusText(order: OrderSummary): { title: string; detail?: string } {
  if (order.status === "FULL") {
    return { title: "Full" };
  }

  if (order.status !== "OPEN") {
    return { title: order.status.charAt(0) + order.status.slice(1).toLowerCase() };
  }

  if (order.isMember) {
    return {
      title:
        order.estimatedSavings === null
          ? "You’re part of this group order."
          : `You’re saving ≈ ${formatCurrency(order.estimatedSavings)} on delivery.`,
      detail:
        order.deliveryCostPerPerson === null
          ? undefined
          : `Current delivery cost is ≈ ${formatCurrency(order.deliveryCostPerPerson)} per person.`,
    };
  }

  const participantCountAfterJoining = order.participantCount + 1;
  const savingsIfJoined = getEstimatedSavings(
    order.estimatedDeliveryFee,
    participantCountAfterJoining,
  );
  const deliveryCostIfJoined = getDeliveryCostPerPerson(
    order.estimatedDeliveryFee,
    participantCountAfterJoining,
  );

  return {
    title:
      savingsIfJoined === null
        ? "Delivery Fee not provided"
        : `Save ${formatCurrency(savingsIfJoined)} on delivery if you join.`,
    detail:
      deliveryCostIfJoined === null
        ? undefined
        : `Your estimated delivery cost would be ≈ ${formatCurrency(deliveryCostIfJoined)}.`,
  };
}
