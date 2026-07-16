import "server-only";

import type { UserProfile } from "@/types";

export type TestUserRole = "organiser" | "participant";

export const TEST_USERS: ReadonlyArray<{ role: TestUserRole; profile: UserProfile }> = [
  {
    role: "organiser",
    profile: {
      id: -42001,
      login: "test_organiser",
      displayName: "Test Organiser",
      avatarUrl: null,
    },
  },
  {
    role: "participant",
    profile: {
      id: -42002,
      login: "test_participant",
      displayName: "Test Participant",
      avatarUrl: null,
    },
  },
];

export function isTestAuthEnabled(): boolean {
  return process.env.NODE_ENV === "development";
}

export function getTestUser(role: string): UserProfile | null {
  return TEST_USERS.find((testUser) => testUser.role === role)?.profile ?? null;
}

export function getTestUserRole(userId: number): TestUserRole | null {
  return TEST_USERS.find((testUser) => testUser.profile.id === userId)?.role ?? null;
}
