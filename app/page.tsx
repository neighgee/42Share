import Image from "next/image";
import { redirect } from "next/navigation";
import { AppHeader } from "@/components/layout/AppHeader";
import { PageContainer } from "@/components/layout/PageContainer";
import { CreateOrderModal } from "@/components/order/CreateOrderModal";
import { EmptyState } from "@/components/order/EmptyState";
import { OrderCard } from "@/components/order/OrderCard";
import { getCurrentUser } from "@/lib/auth/current-user";
import { getTestUserRole, isTestAuthEnabled } from "@/lib/auth/test-users";
import { listOpenOrders, listRecentOrders } from "@/lib/services/orders";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/login");
  }

  const [openOrders, recentOrders] = await Promise.all([
    listOpenOrders(user.id),
    listRecentOrders(user.id),
  ]);
  const testUserRole = isTestAuthEnabled() ? getTestUserRole(user.id) : null;

  return (
    <PageContainer>
      <div className="fixed inset-0 z-0" aria-hidden="true">
        <Image
          src="/images/dashboard-food.webp"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-white/90" />
      </div>

      <div className="relative z-10 grid gap-5">
        <AppHeader user={user} testUserRole={testUserRole} />

        <section className="overflow-hidden rounded-3xl border border-cyan-100 bg-gradient-to-br from-cyan-50 via-white to-teal-50 p-6 shadow-card sm:p-7 lg:p-8">
          <div className="grid gap-5 sm:grid-cols-[1fr_auto] sm:items-end">
            <div className="grid max-w-4xl gap-4">
              <span className="w-fit rounded-full bg-white px-4 py-1.5 text-sm font-semibold uppercase tracking-wider text-brand-dark shadow-sm ring-1 ring-cyan-100">
                42 Singapore group orders
              </span>
              <div className="grid gap-2">
                <h1 className="text-4xl font-bold tracking-tight text-stone-900 sm:text-5xl">
                  Good food, fewer delivery fees.
                </h1>
                <p className="max-w-3xl text-base leading-7 text-stone-600 sm:text-lg">
                  Find an open order nearby or start one for the campus.
                </p>
              </div>
            </div>
            <CreateOrderModal />
          </div>
        </section>

        <section className="grid gap-4">
          <div className="flex items-center justify-between gap-4">
            <div>
              <h2 className="text-2xl font-bold text-stone-900 sm:text-3xl">Open Orders</h2>
              <p className="mt-1 text-base text-stone-500 sm:text-lg">
                Join before the order closes.
              </p>
            </div>
            <span className="rounded-full bg-white px-4 py-2 text-base font-semibold text-brand-dark shadow-sm ring-1 ring-cyan-100">
              {openOrders.length} active
            </span>
          </div>
          {openOrders.length > 0 ? (
            <div className="grid gap-4">
              {openOrders.map((order) => (
                <OrderCard key={order.id} order={order} />
              ))}
            </div>
          ) : (
            <EmptyState />
          )}
        </section>

        <section className="rounded-2xl border border-border bg-white/80 p-5 shadow-card sm:p-6">
          <details className="group">
            <summary className="cursor-pointer text-xl font-semibold text-stone-800 marker:text-brand sm:text-2xl">
              Today&apos;s Recent Orders
            </summary>
            <div className="mt-4 grid gap-4">
              {recentOrders.length > 0 ? (
                recentOrders.map((order) => <OrderCard key={order.id} order={order} readonly />)
              ) : (
                <p className="text-base text-neutral-500">No recent orders today.</p>
              )}
            </div>
          </details>
        </section>
      </div>
    </PageContainer>
  );
}
