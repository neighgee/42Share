import { Check, UserRound, UsersRound } from "lucide-react";
import { JoinOrderButton } from "@/components/order/JoinOrderButton";
import { formatCurrency } from "@/lib/utils";
import { getDeliveryCostPerPerson, getEstimatedSavings } from "@/lib/services/savings";

type SavingsCardProps = {
  estimatedDeliveryFee: number | null;
  participantCount: number;
  isMember: boolean;
  orderId: string;
  canJoin: boolean;
  groupOrderUrl: string;
};

export function SavingsCard({
  estimatedDeliveryFee,
  participantCount,
  isMember,
  orderId,
  canJoin,
  groupOrderUrl,
}: SavingsCardProps) {
  const displayedParticipantCount = isMember ? participantCount : participantCount + 1;
  const displayedDeliveryCost = getDeliveryCostPerPerson(
    estimatedDeliveryFee,
    displayedParticipantCount,
  );
  const displayedSavings = getEstimatedSavings(estimatedDeliveryFee, displayedParticipantCount);

  return (
    <section className="grid gap-3">
      <article className="grid gap-4 rounded-2xl border-2 border-cyan-300 bg-cyan-50 p-5 shadow-sm lg:p-6">
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-3">
            <span className="grid h-11 w-11 place-items-center rounded-full bg-brand text-white">
              <UsersRound className="h-5 w-5" />
            </span>
            <h2 className="text-2xl font-black text-brand-dark">Group Order</h2>
          </div>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-brand px-3 py-1.5 text-sm font-bold text-white">
            <Check className="h-4 w-4" />
            Recommended
          </span>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div className="grid content-start gap-3">
            <ComparisonMetric
              label="Estimated Savings*"
              value={
                displayedSavings === null ? "Not provided" : `≈ ${formatCurrency(displayedSavings)}`
              }
              emphasized
            />
            {canJoin ? <JoinOrderButton orderId={orderId} /> : null}
          </div>
          <ComparisonMetric
            label="Estimated Delivery Fee / Person*"
            value={
              displayedDeliveryCost === null
                ? "Not provided"
                : `≈ ${formatCurrency(displayedDeliveryCost)}`
            }
          />
        </div>

        <div className="grid gap-1 text-left">
          <p className="text-base font-bold text-brand-dark">
            Share the delivery fee with the group.
          </p>
          <p className="text-sm text-brand-dark/70">
            *Calculated with you included in the group order.
          </p>
        </div>
      </article>

      <a
        className="inline-flex h-12 items-center justify-center rounded-xl bg-brand px-6 text-base font-semibold text-white shadow-sm transition-all hover:-translate-y-0.5 hover:bg-brand-dark hover:shadow-md"
        href={groupOrderUrl}
        target="_blank"
        rel="noreferrer"
      >
        Group Order Link
      </a>

      <article className="grid gap-3 rounded-2xl border border-stone-200 bg-stone-100 p-4 text-left lg:p-5">
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-3">
            <span className="grid h-11 w-11 place-items-center rounded-full bg-stone-300 text-stone-700">
              <UserRound className="h-5 w-5" />
            </span>
            <h2 className="text-2xl font-bold text-stone-800">Individual Order</h2>
          </div>
        </div>

        <ComparisonMetric
          label="Total Delivery Fee"
          value={formatCurrency(estimatedDeliveryFee)}
          muted
        />
        <p className="text-base text-stone-600">You cover the full delivery fee.</p>
      </article>
    </section>
  );
}

function ComparisonMetric({
  label,
  value,
  emphasized = false,
  muted = false,
}: {
  label: string;
  value: string;
  emphasized?: boolean;
  muted?: boolean;
}) {
  return (
    <div
      className={
        emphasized
          ? "grid min-h-20 content-center gap-2 rounded-xl bg-white p-4 ring-2 ring-cyan-300"
          : "grid min-h-20 content-center gap-2 rounded-xl bg-white/75 p-4 ring-1 ring-black/5"
      }
    >
      <span className={muted ? "text-base text-stone-500" : "text-base text-brand-dark/70"}>
        {label}
      </span>
      <span
        className={
          muted ? "text-xl font-bold text-stone-800" : "text-2xl font-black text-brand-dark"
        }
      >
        {value}
      </span>
    </div>
  );
}
