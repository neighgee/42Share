import { fail } from "@/lib/api";
import { ServiceError } from "@/lib/services/orders";

export function serviceErrorResponse(error: unknown) {
  if (error instanceof ServiceError) {
    const statusByCode = {
      ALREADY_JOINED: 409,
      ORDER_FULL: 409,
      ORDER_CLOSED: 409,
      ORDER_EXPIRED: 409,
      ORDER_NOT_FOUND: 404,
      FORBIDDEN: 403,
      INTERNAL_SERVER_ERROR: 500,
    } as const;

    return fail(error.code, error.message, statusByCode[error.code]);
  }

  console.error(error);
  return fail("INTERNAL_SERVER_ERROR", "Unexpected error.", 500);
}
