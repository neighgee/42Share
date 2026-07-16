import { z } from "zod";

const grabHostPattern = /(^|\.)grab\.com$/i;

export const createOrderSchema = z.object({
  restaurant: z.string().trim().min(2, "Restaurant must be at least 2 characters.").max(100),
  groupOrderUrl: z
    .string()
    .trim()
    .url("Invalid Grab Group Order URL.")
    .refine((value) => {
      try {
        const url = new URL(value);
        return url.protocol === "https:" && grabHostPattern.test(url.hostname);
      } catch {
        return false;
      }
    }, "Invalid Grab Group Order URL."),
  estimatedDeliveryFee: z
    .union([z.number(), z.string(), z.null(), z.undefined()])
    .transform((value) => {
      if (value === null || value === undefined || value === "") {
        return null;
      }

      return typeof value === "number" ? value : Number(value);
    })
    .pipe(z.number().min(0).max(100).multipleOf(0.01).nullable()),
  expiryMinutes: z
    .number()
    .int()
    .min(30, "Closing time must be at least 30 minutes.")
    .max(720, "Closing time must be 12 hours or less.")
    .refine((value) => value % 30 === 0, "Closing time must use 30-minute increments."),
  notes: z
    .union([z.string(), z.null(), z.undefined()])
    .transform((value) => {
      const trimmed = typeof value === "string" ? value.trim() : "";
      return trimmed.length > 0 ? trimmed : null;
    })
    .pipe(z.string().max(250).nullable()),
});

export type CreateOrderInput = z.infer<typeof createOrderSchema>;
