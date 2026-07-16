export type OrderStatus = "OPEN" | "CLOSED" | "EXPIRED" | "FULL";

export type ApiSuccess<T> = {
  success: true;
  data: T;
};

export type ApiFailure = {
  success: false;
  error: {
    code: ApiErrorCode;
    message: string;
  };
};

export type ApiResponse<T> = ApiSuccess<T> | ApiFailure;

export type ApiErrorCode =
  | "VALIDATION_ERROR"
  | "INVALID_GRAB_URL"
  | "INVALID_EXPIRY"
  | "ALREADY_JOINED"
  | "ORDER_FULL"
  | "ORDER_CLOSED"
  | "ORDER_EXPIRED"
  | "ORDER_NOT_FOUND"
  | "UNAUTHORIZED"
  | "FORBIDDEN"
  | "INTERNAL_SERVER_ERROR";

export type UserProfile = {
  id: number;
  login: string;
  displayName: string;
  avatarUrl: string | null;
};

export type OrderSummary = {
  id: string;
  restaurant: string;
  estimatedDeliveryFee: number | null;
  participantCount: number;
  remainingSlots: number;
  deliveryCostPerPerson: number | null;
  estimatedSavings: number | null;
  expiresAt: string;
  status: OrderStatus;
  notes: string | null;
  isMember: boolean;
  creator: UserProfile;
};

export type OrderDetails = OrderSummary & {
  groupOrderUrl: string;
  createdAt: string;
};
