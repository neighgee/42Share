import "server-only";

import { getSessionUserId } from "@/lib/auth/session";
import { getUserById } from "@/lib/services/users";
import type { UserProfile } from "@/types";

export async function getCurrentUser(): Promise<UserProfile | null> {
  const userId = await getSessionUserId();

  if (!userId) {
    return null;
  }

  return getUserById(userId);
}
