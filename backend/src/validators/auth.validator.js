import { z } from "zod";

/**
 * Auth validation schemas
 */
export const authValidators = {
  register: z.object({
    body: z.object({
      firstName: z.string().min(2, "First name must be at least 2 characters").max(50),
      lastName: z.string().min(2, "Last name must be at least 2 characters").max(50),
      email: z.string().email("Invalid email format"),
      password: z.string().min(6, "Password must be at least 6 characters"),
      phone: z.string().optional(),
    }),
  }),

  login: z.object({
    body: z.object({
      email: z.string().email("Invalid email format"),
      password: z.string().min(1, "Password is required"),
    }),
  }),

  refreshToken: z.object({
    body: z.object({
      refreshToken: z.string().min(1, "Refresh token is required"),
    }),
  }),

  logout: z.object({
    body: z.object({
      refreshToken: z.string().min(1, "Refresh token is required"),
    }),
  }),
};
