import Image from "next/image";
import type { UserProfile } from "@/types";

export function UserAvatar({ user }: { user: UserProfile }) {
  return (
    <div className="flex items-center gap-4">
      {user.avatarUrl ? (
        <Image
          src={user.avatarUrl}
          alt=""
          width={48}
          height={48}
          className="h-12 w-12 rounded-full border-2 border-cyan-100"
        />
      ) : (
        <span className="flex h-12 w-12 items-center justify-center rounded-full border border-cyan-100 bg-brand-soft text-lg font-semibold text-brand-dark">
          {user.login.charAt(0).toUpperCase()}
        </span>
      )}
      <div className="grid gap-0.5">
        <span className="text-sm text-stone-500">Hosted by</span>
        <span className="text-base font-semibold text-stone-800">{user.login}</span>
      </div>
    </div>
  );
}
