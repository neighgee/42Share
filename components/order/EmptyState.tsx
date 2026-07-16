import { CreateOrderModal } from "@/components/order/CreateOrderModal";

export function EmptyState() {
  return (
    <section className="grid min-h-48 place-content-center gap-5 rounded-2xl border border-dashed border-cyan-200 bg-white/75 px-6 py-8 text-center shadow-card">
      <div className="grid gap-3">
        <h2 className="text-2xl font-bold text-stone-900 sm:text-3xl">
          No active group orders yet.
        </h2>
        <p className="text-base text-stone-500 sm:text-lg">Be the first to get lunch moving.</p>
      </div>
      <div>
        <CreateOrderModal />
      </div>
    </section>
  );
}
