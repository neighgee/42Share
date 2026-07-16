import { NextRequest, NextResponse } from "next/server";
import { exchangeCodeForToken, getFortyTwoUser } from "@/lib/auth/forty-two";
import { createSession } from "@/lib/auth/session";
import { getOptionalEnv } from "@/lib/env";
import { upsertUser } from "@/lib/services/users";

export async function GET(request: NextRequest) {
  const code = request.nextUrl.searchParams.get("code");

  if (!code) {
    return NextResponse.redirect(new URL("/login?error=oauth", request.url));
  }

  try {
    const accessToken = await exchangeCodeForToken(code);
    const profile = await getFortyTwoUser(accessToken);
    const user = await upsertUser(profile);
    await createSession(user.id);

    return NextResponse.redirect(
      getOptionalEnv("NEXT_PUBLIC_APP_URL") ?? new URL("/", request.url),
    );
  } catch (error) {
    console.error(error);
    return NextResponse.redirect(new URL("/login?error=oauth", request.url));
  }
}
