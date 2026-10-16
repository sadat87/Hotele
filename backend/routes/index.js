import { Router } from "express";

const router = Router();

/* Feature routes (to be added later) */
// router.use("/auth", authRoutes);
// router.use("/users", userRoutes);
// router.use("/bookings", bookingRoutes);

router.get("/", (_req, res) => {
  res.json({ message: "Hotel Management API" });
});

export default router;
