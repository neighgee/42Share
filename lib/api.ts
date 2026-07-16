import { NextResponse } from "next/server";
import type { ApiErrorCode, ApiFailure, ApiSuccess } from "@/types";

export function ok<T>(data: T, init?: ResponseInit): NextResponse<ApiSuccess<T>> {
  return NextResponse.json({ success: true, data }, init);
}

export function fail(
  code: ApiErrorCode,
  message: string,
  status: number,
): NextResponse<ApiFailure> {
  return NextResponse.json(
    {
      success: false,
      error: { code, message },
    },
    { status },
  );
}
