import Image from "next/image";
import { redirect } from "next/navigation";
import { BrandLogo } from "@/components/brand/BrandLogo";
import { getCurrentUser } from "@/lib/auth/current-user";
import { isTestAuthEnabled, TEST_USERS } from "@/lib/auth/test-users";

export const dynamic = "force-dynamic";

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const user = await getCurrentUser();

  if (user) {
    redirect("/");
  }

  const params = await searchParams;
  const showTestAccounts = isTestAuthEnabled();

  return (
    <main className="relative min-h-screen overflow-hidden bg-stone-950">
      <div className="absolute inset-0 grid grid-cols-2 grid-rows-3 gap-1.5 p-1.5 lg:grid-cols-3 lg:grid-rows-2">
        <FoodImage
          src="/images/food-tacos.webp"
          alt="Freshly prepared tacos"
          brandLogoSrc="/images/brand-lavi.svg"
          brandName="LAVI"
          className="col-start-1 row-start-1"
        />
        <FoodImage
          src="/images/food-bubble-tea.webp"
          alt="Bubble tea drinks"
          brandLogoSrc="/images/brand-chicha.webp"
          brandName="Chicha San Chen"
          className="col-start-2 row-start-1"
        />
        <FoodImage
          src="/images/food-local-noodles.webp"
          alt="Wok-fried noodles"
          brandLogoSrc="/images/brand-malaysia-boleh.svg"
          brandName="Malaysia Boleh!"
          className="col-start-1 row-start-2 lg:col-start-3 lg:row-start-1"
        />
        <FoodImage
          src="/images/food-ramen.webp"
          alt="Prawn ramen"
          brandLogoSrc="/images/brand-ippudo.webp"
          brandName="Ippudo"
          className="col-start-2 row-start-2 lg:col-start-1 lg:row-start-2"
        />
        <FoodImage
          src="/images/food-wings.webp"
          alt="Glazed chicken wings"
          brandLogoSrc="/images/brand-wingstop.svg"
          brandName="Wingstop"
          className="col-span-2 col-start-1 row-start-3 lg:col-start-2 lg:row-start-2"
        />
      </div>
      <div className="pointer-events-none absolute inset-0 bg-stone-950/20" />

      <section className="relative z-10 flex min-h-screen items-center justify-center px-5 py-10 sm:px-8">
        <div className="grid min-h-[630px] w-full max-w-lg content-between gap-7 rounded-[2rem] border border-white/80 bg-white/95 p-8 text-left shadow-2xl backdrop-blur-xl sm:min-h-[660px] sm:p-10">
          <div className="rounded-2xl bg-brand-soft p-6 ring-1 ring-cyan-100">
            <h1>
              <BrandLogo size="xlarge" />
            </h1>
            <p className="mt-5 text-3xl font-black tracking-tight text-brand sm:text-4xl">
              <span className="block">Order Together.</span>
              <span className="block">Save Together.</span>
            </p>
          </div>

          {params.error ? (
            <p className="text-base text-danger">
              {params.error === "test-account"
                ? "Unable to start the test session."
                : "Unable to continue with 42."}
            </p>
          ) : null}

          <a
            href="/api/auth/login"
            className="inline-flex h-16 items-center justify-center rounded-xl bg-brand px-7 text-xl font-bold text-white shadow-sm transition hover:-translate-y-0.5 hover:bg-brand-dark hover:shadow-md"
          >
            Continue with 42
          </a>

          {showTestAccounts ? (
            <div className="grid gap-5 rounded-2xl border border-cyan-100 bg-brand-soft/70 p-6 text-left">
              <div>
                <p className="text-lg font-semibold">Development test accounts</p>
                <p className="mt-1 text-base leading-7 text-stone-500">
                  Simulate two different users without another 42 account.
                </p>
              </div>
              <div className="grid grid-cols-2 gap-3">
                {TEST_USERS.map(({ role, profile }) => (
                  <form key={role} action="/api/auth/test-login" method="post">
                    <input type="hidden" name="role" value={role} />
                    <button
                      type="submit"
                      className="inline-flex h-14 w-full items-center justify-center rounded-xl border border-border bg-white px-3 text-lg font-semibold text-stone-700 transition hover:border-cyan-200 hover:bg-brand-soft hover:text-brand-dark"
                    >
                      {profile.displayName}
                    </button>
                  </form>
                ))}
              </div>
            </div>
          ) : null}
        </div>
      </section>
    </main>
  );
}

function FoodImage({
  src,
  alt,
  brandLogoSrc,
  brandName,
  className = "",
}: {
  src: string;
  alt: string;
  brandLogoSrc: string;
  brandName: string;
  className?: string;
}) {
  return (
    <div className={`relative overflow-hidden ${className}`}>
      <Image
        src={src}
        alt={alt}
        fill
        priority
        sizes="(min-width: 1024px) 30vw, 50vw"
        className="object-cover"
      />
      <div
        className="absolute right-4 top-4 grid h-16 w-36 place-items-center overflow-hidden rounded-xl border border-white/80 bg-white/95 px-3 py-2 shadow-lg backdrop-blur sm:h-[4.5rem] sm:w-40"
      >
        <Image
          src={brandLogoSrc}
          alt={`${brandName} logo`}
          width={144}
          height={56}
          priority
          unoptimized
          className="h-full w-full object-contain object-center"
        />
      </div>
    </div>
  );
}
