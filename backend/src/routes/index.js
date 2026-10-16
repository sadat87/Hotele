import express from "express";
import authRoutes from "./auth.routes.js";
import bookingsRoutes from "./bookings.routes.js";
import paymentsRoutes from "./payments.routes.js";
import hotelsRoutes from "./hotels.routes.js";
import usersRoutes from "./users.routes.js";
import offersRoutes from "./offers.routes.js";

const router = express.Router();

/**
 * API Routes
 */

router.use("/auth", authRoutes);
router.use("/bookings", bookingsRoutes);
router.use("/payments", paymentsRoutes);
router.use("/hotels", hotelsRoutes);
router.use("/rooms", hotelsRoutes); // Rooms are under hotels for better organization
router.use("/users", usersRoutes);
router.use("/offers", offersRoutes);

/**
 * Health check
 */
router.get("/", (req, res) => {
  res.status(200).json({
    message: "Hotel Management API",
    version: "1.0.0",
    timestamp: new Date().toISOString(),
  });
});

export default router;
