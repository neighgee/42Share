import { Users } from "lucide-react";

export function ParticipantBadge({ count }: { count: number }) {
  return (
    <span className="inline-flex w-fit items-center gap-2 rounded-full bg-cyan-50 px-4 py-2 text-base font-semibold text-brand-dark ring-1 ring-inset ring-cyan-100">
      <Users className="h-4 w-4" />
      {count} / 10 joined
    </span>
  );
}
