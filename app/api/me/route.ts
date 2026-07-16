import { fail, ok } from "@/lib/api";
import { getCurrentUser } from "@/lib/auth/current-user";

export async function GET() {
  const user = await getCurrentUser();

  if (!user) {
    return fail("UNAUTHORIZED", "Authentication required.", 401);
  }

  return ok(user);
}
