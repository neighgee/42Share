import { NextResponse } from "next/server";
import { createSession } from "@/lib/auth/session";
import { getTestUser, isTestAuthEnabled } from "@/lib/auth/test-users";
import { upsertUser } from "@/lib/services/users";

export async function POST(request: Request) {
  if (!isTestAuthEnabled()) {
    return new NextResponse("Not found.", { status: 404 });
  }

  const formData = await request.formData();
  const role = formData.get("role");
  const profile = getTestUser(typeof role === "string" ? role : "");

  if (!profile) {
    return NextResponse.redirect(new URL("/login?error=test-account", request.url), {
      status: 303,
    });
  }

  try {
    const user = await upsertUser(profile);
    await createSession(user.id);
    return NextResponse.redirect(new URL("/", request.url), { status: 303 });
  } catch (error) {
    console.error("Test account login failed.", error);
    return NextResponse.redirect(new URL("/login?error=test-account", request.url), {
      status: 303,
    });
  }
}
