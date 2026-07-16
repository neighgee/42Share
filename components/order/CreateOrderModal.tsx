"use client";

import { X } from "lucide-react";
import { useRouter } from "next/navigation";
import { FormEvent, useMemo, useState } from "react";
import { Button } from "@/components/ui/Button";
import { Field, inputClassName } from "@/components/ui/Field";

export function CreateOrderModal() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const expiryOptions = useMemo(
    () => Array.from({ length: 24 }, (_, index) => (index + 1) * 30),
    [],
  );

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitting(true);
    setError(null);

    const formData = new FormData(event.currentTarget);
    const fee = formData.get("estimatedDeliveryFee")?.toString().trim();

    const response = await fetch("/api/orders", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        restaurant: formData.get("restaurant"),
        groupOrderUrl: formData.get("groupOrderUrl"),
        estimatedDeliveryFee: fee ? Number(fee) : null,
        expiryMinutes: Number(formData.get("expiryMinutes")),
        notes: formData.get("notes"),
      }),
    });

    const payload = (await response.json()) as { success: boolean; error?: { message: string } };
    setSubmitting(false);

    if (!payload.success) {
      setError(payload.error?.message ?? "Unable to create order.");
      return;
    }

    setOpen(false);
    router.refresh();
  }

  return (
    <>
      <Button type="button" onClick={() => setOpen(true)}>
        Start Group Order
      </Button>

      {open ? (
        <div className="fixed inset-0 z-50 grid place-items-center bg-stone-950/35 px-4 py-5 backdrop-blur-sm">
          <div className="flex h-[min(860px,94vh)] w-full max-w-xl flex-col overflow-auto rounded-3xl border border-white/80 bg-white p-7 shadow-2xl sm:p-10">
            <div className="mb-8 flex items-center justify-between gap-4">
              <div>
                <h2 className="text-3xl font-bold tracking-tight text-stone-900">
                  Start Group Order
                </h2>
                <p className="mt-2 text-base text-stone-500">Share the details with the campus.</p>
              </div>
              <button
                type="button"
                className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-border text-stone-500 transition hover:border-cyan-200 hover:bg-brand-soft hover:text-brand-dark"
                onClick={() => setOpen(false)}
                aria-label="Close"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <form className="grid flex-1 content-between gap-5" onSubmit={onSubmit}>
              <Field label="Restaurant" required>
                <input
                  className={inputClassName()}
                  name="restaurant"
                  minLength={2}
                  maxLength={100}
                  required
                />
              </Field>

              <Field label="Grab Group Order URL" required>
                <input className={inputClassName()} name="groupOrderUrl" type="url" required />
              </Field>

              <Field label="Total Delivery Fee">
                <input
                  className={inputClassName()}
                  name="estimatedDeliveryFee"
                  type="number"
                  min="0"
                  max="100"
                  step="0.01"
                  inputMode="decimal"
                />
              </Field>

              <Field label="Closing Time" required>
                <select
                  className={inputClassName()}
                  name="expiryMinutes"
                  defaultValue={60}
                  required
                >
                  {expiryOptions.map((minutes) => (
                    <option key={minutes} value={minutes}>
                      {minutes < 60
                        ? `${minutes} minutes`
                        : `${minutes / 60} hour${minutes === 60 ? "" : "s"}`}
                    </option>
                  ))}
                </select>
              </Field>

              <Field label="Notes">
                <textarea
                  className={inputClassName("min-h-32 py-4")}
                  name="notes"
                  maxLength={250}
                />
              </Field>

              {error ? <p className="text-base text-danger">{error}</p> : null}

              <div className="flex justify-end gap-3 pt-3">
                <Button type="button" variant="secondary" onClick={() => setOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit" disabled={submitting}>
                  {submitting ? "Creating..." : "Create Group Order"}
                </Button>
              </div>
            </form>
          </div>
        </div>
      ) : null}
    </>
  );
}
