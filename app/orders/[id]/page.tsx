import Image from "next/image";
import { notFound, redirect } from "next/navigation";
import type { ReactNode } from "react";
import { AppHeader } from "@/components/layout/AppHeader";
import { PageContainer } from "@/components/layout/PageContainer";
import { OrderActions } from "@/components/order/OrderActions";
import { ParticipantBadge } from "@/components/order/ParticipantBadge";
import { SavingsCard } from "@/components/order/SavingsCard";
import { UserAvatar } from "@/components/order/UserAvatar";
import { getCurrentUser } from "@/lib/auth/current-user";
import { getRestaurantVisual } from "@/lib/restaurant-visuals";
import { ServiceError, getOrderById } from "@/lib/services/orders";

export const dynamic = "force-dynamic";

type OrderDetailsPageProps = {
  params: Promise<{ id: string }>;
};

export default async function OrderDetailsPage({ params }: OrderDetailsPageProps) {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/login");
  }

  const { id } = await params;

  try {
    const order = await getOrderById(id, user.id);
    const restaurantVisual = getRestaurantVisual(order.restaurant);

    return (
      <PageContainer>
        <div className="grid gap-4">
          <AppHeader user={user} backHref="/" />

          <article className="grid gap-5 rounded-3xl border border-border bg-white p-6 shadow-card sm:p-7 lg:p-8">
            <section className="grid gap-5 lg:grid-cols-[minmax(360px,0.8fr)_1.2fr] lg:items-center">
              <div className="flex items-center gap-5">
                {restaurantVisual ? (
                  <div className="relative h-28 w-28 shrink-0 overflow-hidden rounded-3xl bg-stone-100 shadow-md ring-1 ring-black/5">
                    <Image
                      src={restaurantVisual.imageSrc}
                      alt={restaurantVisual.imageAlt}
                      fill
                      priority
                      sizes="112px"
                      className="object-cover"
                      style={{ objectPosition: restaurantVisual.objectPosition }}
                    />
                  </div>
                ) : null}
                <div className="grid min-w-0 gap-3">
                  <span className="w-fit rounded-full bg-brand-soft px-4 py-1.5 text-sm font-semibold uppercase tracking-wider text-brand-dark">
                    Group order
                  </span>
                  <h1 className="break-words text-4xl font-bold tracking-tight text-stone-900">
                    {order.restaurant}
                  </h1>
                  <UserAvatar user={order.creator} />
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-3">
                <Metric
                  label="Participants"
                  value={<ParticipantBadge count={order.participantCount} />}
                />
                <Metric label="Status" value={order.status} />
                <Metric label="Remaining Slots" value={String(order.remainingSlots)} />
              </div>
            </section>

            <SavingsCard
              estimatedDeliveryFee={order.estimatedDeliveryFee}
              participantCount={order.participantCount}
              isMember={order.isMember}
              orderId={order.id}
              canJoin={order.status === "OPEN" && !order.isMember}
              groupOrderUrl={order.groupOrderUrl}
            />

            {order.notes ? (
              <section className="grid gap-2">
                <h2 className="text-2xl font-bold text-stone-900">Notes</h2>
                <p className="rounded-xl border border-cyan-100 bg-cyan-50/70 p-5 text-base leading-7 text-stone-600">
                  {order.notes}
                </p>
              </section>
            ) : null}

            {order.status === "FULL" ? (
              <p className="rounded-xl border border-border bg-stone-50 p-5 text-base text-stone-600">
                This order is no longer accepting members.
              </p>
            ) : null}

            <OrderActions order={order} currentUserId={user.id} />
          </article>
        </div>
      </PageContainer>
    );
  } catch (error) {
    if (error instanceof ServiceError && error.code === "ORDER_NOT_FOUND") {
      notFound();
    }

    throw error;
  }
}

function Metric({ label, value }: { label: string; value: ReactNode }) {
  return (
    <div className="grid min-h-20 content-center gap-1 rounded-xl bg-stone-50 p-4">
      <span className="text-base text-stone-500">{label}</span>
      <span className="text-lg font-semibold text-stone-900">{value}</span>
    </div>
  );
}
