import { z } from "zod";

/**
 * Room validation schemas
 */
export const roomValidators = {
  create: z.object({
    body: z.object({
      roomNumber: z.string().min(1, "Room number is required"),
      roomTypeId: z.string().min(1, "Room type ID is required"),
      hotelId: z.string().min(1, "Hotel ID is required"),
      floor: z.number().min(0, "Floor cannot be negative"),
    }),
  }),

  update: z.object({
    body: z.object({
      floor: z.number().min(0).optional(),
      status: z.enum(["AVAILABLE", "OCCUPIED", "MAINTENANCE", "RESERVED"]).optional(),
    }),
  }),

  search: z.object({
    query: z.object({
      hotelId: z.string().optional(),
      checkInDate: z.string().datetime().optional(),
      checkOutDate: z.string().datetime().optional(),
      guests: z.string().transform((v) => parseInt(v, 10)).optional(),
      roomTypeId: z.string().optional(),
    }),
  }),
};
