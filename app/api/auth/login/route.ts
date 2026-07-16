import { NextResponse } from "next/server";
import { getFortyTwoAuthorizationUrl } from "@/lib/auth/forty-two";

export async function GET() {
  return NextResponse.redirect(getFortyTwoAuthorizationUrl());
}
