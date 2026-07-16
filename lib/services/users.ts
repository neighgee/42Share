import "server-only";

import { getSupabaseAdmin } from "@/lib/database/supabase";
import type { UserProfile } from "@/types";

type UserRow = {
  id: number;
  login: string;
  display_name: string;
  avatar_url: string | null;
};

export function mapUser(row: UserRow): UserProfile {
  return {
    id: row.id,
    login: row.login,
    displayName: row.display_name,
    avatarUrl: row.avatar_url,
  };
}

export async function upsertUser(profile: UserProfile): Promise<UserProfile> {
  const supabase = getSupabaseAdmin();
  const { data, error } = await supabase
    .from("users")
    .upsert({
      id: profile.id,
      login: profile.login,
      display_name: profile.displayName,
      avatar_url: profile.avatarUrl,
    })
    .select("id, login, display_name, avatar_url")
    .single();

  if (error || !data) {
    console.error("Supabase user synchronisation failed.", {
      code: error?.code,
      message: error?.message,
      details: error?.details,
      hint: error?.hint,
    });
    throw new Error("Unable to synchronise user.");
  }

  return mapUser(data);
}

export async function getUserById(userId: number): Promise<UserProfile | null> {
  const supabase = getSupabaseAdmin();
  const { data, error } = await supabase
    .from("users")
    .select("id, login, display_name, avatar_url")
    .eq("id", userId)
    .maybeSingle();

  if (error) {
    throw new Error("Unable to retrieve user.");
  }

  return data ? mapUser(data) : null;
}
