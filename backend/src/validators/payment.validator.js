import { z } from "zod";

/**
 * Payment validation schemas
 */
export const paymentValidators = {
  create: z.object({
    body: z.object({
      bookingId: z.string().min(1, "Booking ID is required"),
      paymentMethod: z.enum(["CREDIT_CARD", "DEBIT_CARD", "BANK_TRANSFER", "PAYPAL", "WALLET"]),
      cardDetails: z
        .object({
          cardNumber: z.string().regex(/^\d{13,19}$/, "Invalid card number"),
          cardholderName: z.string().min(1),
          expiryMonth: z.number().min(1).max(12),
          expiryYear: z.number(),
          cvv: z.string().regex(/^\d{3,4}$/, "Invalid CVV"),
        })
        .optional(),
    }),
  }),

  confirm: z.object({
    body: z.object({
      paymentIntentId: z.string().min(1, "Payment intent ID is required"),
      token: z.string().optional(),
    }),
  }),
};
