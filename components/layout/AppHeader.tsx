import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, LogOut } from "lucide-react";
import { BrandLogo } from "@/components/brand/BrandLogo";
import type { TestUserRole } from "@/lib/auth/test-users";
import type { UserProfile } from "@/types";

export function AppHeader({
  user,
  testUserRole,
  backHref,
}: {
  user: UserProfile;
  testUserRole?: TestUserRole | null;
  backHref?: string;
}) {
  return (
    <header className="flex items-center justify-between rounded-2xl border border-white/80 bg-white/90 px-5 py-4 shadow-card backdrop-blur sm:px-7 sm:py-5">
      <div className="flex items-center gap-4">
        {backHref ? (
          <Link
            href={backHref}
            className="inline-flex h-10 items-center gap-1.5 rounded-xl border border-border bg-white px-3 text-sm font-semibold text-stone-600 shadow-sm transition hover:border-cyan-200 hover:bg-brand-soft hover:text-brand-dark"
          >
            <ArrowLeft className="h-4 w-4" />
            Back
          </Link>
        ) : null}
        <Link
          href="/"
          className="inline-flex rounded-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300"
          aria-label="42Share home"
        >
          <BrandLogo size="medium" />
        </Link>
      </div>
      <div className="flex items-center gap-3">
        {testUserRole ? (
          <form
            action="/api/auth/test-login"
            method="post"
            className="hidden items-center gap-2 sm:flex"
          >
            <label htmlFor="test-account" className="text-sm font-medium text-stone-500">
              Test as
            </label>
            <select
              id="test-account"
              name="role"
              defaultValue={testUserRole}
              className="h-11 rounded-xl border border-border bg-white px-3 text-base outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-100"
            >
              <option value="organiser">Organiser</option>
              <option value="participant">Participant</option>
            </select>
            <button
              type="submit"
              className="h-11 rounded-xl border border-cyan-200 bg-brand-soft px-4 text-sm font-semibold text-brand-dark hover:bg-cyan-100"
            >
              Switch
            </button>
          </form>
        ) : null}
        <div className="flex items-center gap-3 text-base text-stone-600">
          {user.avatarUrl ? (
            <Image
              src={user.avatarUrl}
              alt=""
              width={40}
              height={40}
              className="h-10 w-10 rounded-full border-2 border-cyan-100"
            />
          ) : (
            <span className="flex h-10 w-10 items-center justify-center rounded-full border border-cyan-100 bg-brand-soft font-semibold text-brand-dark">
              {user.login.charAt(0).toUpperCase()}
            </span>
          )}
          <span className="hidden sm:inline">{user.login}</span>
        </div>
        <form action="/api/auth/logout" method="post">
          <button
            type="submit"
            className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-border bg-white text-stone-500 transition hover:border-cyan-200 hover:bg-brand-soft hover:text-brand-dark"
            aria-label="Logout"
            title="Logout"
          >
            <LogOut className="h-5 w-5" />
          </button>
        </form>
      </div>
    </header>
  );
}
