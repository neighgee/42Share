import { fail, ok } from "@/lib/api";
import { serviceErrorResponse } from "@/lib/api-errors";
import { getCurrentUser } from "@/lib/auth/current-user";
import { joinOrder } from "@/lib/services/orders";
import { orderIdSchema } from "@/lib/validation/http";

type RouteContext = {
  params: Promise<{ id: string }>;
};

export async function POST(_request: Request, context: RouteContext) {
  const user = await getCurrentUser();

  if (!user) {
    return fail("UNAUTHORIZED", "Authentication required.", 401);
  }

  const params = await context.params;
  const parsedId = orderIdSchema.safeParse(params.id);

  if (!parsedId.success) {
    return fail("ORDER_NOT_FOUND", "Order not found.", 404);
  }

  try {
    const order = await joinOrder(parsedId.data, user.id);
    return ok({
      participantCount: order.participantCount,
      remainingSlots: order.remainingSlots,
      deliveryCostPerPerson: order.deliveryCostPerPerson,
      estimatedSavings: order.estimatedSavings,
      status: order.status,
    });
  } catch (error) {
    return serviceErrorResponse(error);
  }
}
