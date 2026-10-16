import { z } from "zod";

/**
 * Booking validation schemas
 */
export const bookingValidators = {
  create: z.object({
    body: z.object({
      roomId: z.string().min(1, "Room ID is required"),
      checkInDate: z.string().datetime("Invalid check-in date format"),
      checkOutDate: z.string().datetime("Invalid check-out date format"),
      numberOfGuests: z.number().min(1, "Must have at least 1 guest"),
      specialRequests: z.string().max(500).optional(),
      offerCode: z.string().optional(),
    }),
  }),

  update: z.object({
    body: z.object({
      checkInDate: z.string().datetime().optional(),
      checkOutDate: z.string().datetime().optional(),
      numberOfGuests: z.number().min(1).optional(),
      specialRequests: z.string().max(500).optional(),
    }),
  }),

  cancel: z.object({
    body: z.object({
      reason: z.string().min(1, "Cancellation reason is required"),
    }),
  }),
};
