import { NextRequest } from "next/server";
import { ZodError } from "zod";
import { fail, ok } from "@/lib/api";
import { serviceErrorResponse } from "@/lib/api-errors";
import { getCurrentUser } from "@/lib/auth/current-user";
import { createOrder, listOpenOrders, listRecentOrders } from "@/lib/services/orders";
import { createOrderSchema } from "@/lib/validation/orders";

export async function GET(request: NextRequest) {
  const user = await getCurrentUser();

  if (!user) {
    return fail("UNAUTHORIZED", "Authentication required.", 401);
  }

  try {
    const status = request.nextUrl.searchParams.get("status");
    const orders =
      status === "recent" ? await listRecentOrders(user.id) : await listOpenOrders(user.id);
    return ok(orders);
  } catch (error) {
    console.error(error);
    return fail("INTERNAL_SERVER_ERROR", "Unexpected error.", 500);
  }
}

export async function POST(request: NextRequest) {
  const user = await getCurrentUser();

  if (!user) {
    return fail("UNAUTHORIZED", "Authentication required.", 401);
  }

  try {
    const input = createOrderSchema.parse(await request.json());
    const order = await createOrder(input, user.id);
    return ok(order, { status: 201 });
  } catch (error) {
    if (error instanceof ZodError) {
      const firstIssue = error.issues[0];
      return fail("VALIDATION_ERROR", firstIssue?.message ?? "Invalid input.", 400);
    }

    return serviceErrorResponse(error);
  }
}
