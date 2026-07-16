"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/ui/Button";
import type { OrderDetails } from "@/types";

export function OrderActions({
  order,
  currentUserId,
}: {
  order: OrderDetails;
  currentUserId: number;
}) {
  const router = useRouter();
  const [message, setMessage] = useState<string | null>(null);
  const [pending, setPending] = useState<string | null>(null);
  const isOwner = order.creator.id === currentUserId;

  async function postAction(url: string, method: "POST" | "PATCH", successMessage: string) {
    setPending(url);
    setMessage(null);
    const response = await fetch(url, { method });
    const payload = (await response.json()) as { success: boolean; error?: { message: string } };
    setPending(null);

    if (!payload.success) {
      setMessage(payload.error?.message ?? "Unexpected error.");
      return;
    }

    setMessage(successMessage);
    router.refresh();
  }

  if (!isOwner || order.status !== "OPEN") {
    return null;
  }

  return (
    <div className="grid gap-4">
      <Button
        type="button"
        variant="danger"
        disabled={pending !== null}
        onClick={() => {
          if (window.confirm("Mark this group order as closed?")) {
            void postAction(`/api/orders/${order.id}/close`, "PATCH", "Order closed.");
          }
        }}
      >
        Mark as Closed
      </Button>

      {message ? <p className="text-base text-neutral-600">{message}</p> : null}
    </div>
  );
}
