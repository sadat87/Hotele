import express from "express";
import { paymentsController } from "../controllers/payments.controller.js";
import { verifyToken } from "../middleware/auth.middleware.js";
import { validateBody } from "../middleware/validate.middleware.js";
import { paymentValidators } from "../validators/payment.validator.js";
import { asyncHandler } from "../utils/ApiError.js";

const router = express.Router();

/**
 * Payments Routes (all protected)
 */

router.post(
  "/intent",
  verifyToken,
  validateBody(paymentValidators.create.shape.body),
  asyncHandler(paymentsController.createPaymentIntent)
);

router.post(
  "/confirm",
  verifyToken,
  validateBody(paymentValidators.confirm.shape.body),
  asyncHandler(paymentsController.confirmPayment)
);

router.get("/", verifyToken, asyncHandler(paymentsController.getUserPayments));

router.get("/:id", verifyToken, asyncHandler(paymentsController.getPayment));

router.post("/:id/refund", verifyToken, asyncHandler(paymentsController.refundPayment));

router.get("/:id/receipt", verifyToken, asyncHandler(paymentsController.getReceipt));

export default router;
