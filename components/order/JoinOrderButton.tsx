"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export function JoinOrderButton({ orderId }: { orderId: string }) {
  const router = useRouter();
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function joinOrder() {
    setPending(true);
    setError(null);

    const response = await fetch(`/api/orders/${orderId}/join`, { method: "POST" });
    const payload = (await response.json()) as { success: boolean; error?: { message: string } };

    if (!payload.success) {
      setError(payload.error?.message ?? "Unable to join this order.");
      setPending(false);
      return;
    }

    router.refresh();
  }

  return (
    <div className="grid shrink-0 gap-2">
      <button
        type="button"
        disabled={pending}
        onClick={() => void joinOrder()}
        className="inline-flex h-12 items-center justify-center rounded-xl bg-brand px-6 text-base font-bold text-white shadow-sm transition hover:-translate-y-0.5 hover:bg-brand-dark hover:shadow-md disabled:cursor-not-allowed disabled:opacity-50"
      >
        {pending ? "Joining..." : "Join & Save"}
      </button>
      {error ? <p className="max-w-52 text-sm text-danger">{error}</p> : null}
    </div>
  );
}
