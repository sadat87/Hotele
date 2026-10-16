import { asyncHandler, ApiError } from "../utils/ApiError.js";
import { sendSuccess } from "../utils/response.js";
import { Payment } from "../models/Payment.model.js";
import { Booking } from "../models/Booking.model.js";
import { bookingService } from "../services/booking.service.js";
import { logger } from "../utils/logger.js";

/**
 * Payments Controller
 */
export const paymentsController = {
  /**
   * Create payment intent
   * POST /api/payments/intent
   */
  createPaymentIntent: asyncHandler(async (req, res) => {
    const { bookingId } = req.body;

    const booking = await Booking.findById(bookingId);

    if (!booking) {
      throw new ApiError(404, "Booking not found");
    }

    if (booking.customer.toString() !== req.user._id.toString()) {
      throw new ApiError(403, "You can only pay for your own bookings");
    }

    // Create payment intent
    const payment = new Payment({
      booking: bookingId,
      customer: req.user._id,
      amount: booking.totalAmount,
      paymentMethod: req.body.paymentMethod || "CREDIT_CARD",
      status: "PENDING",
      metadata: {
        ipAddress: req.ip,
        userAgent: req.headers["user-agent"],
      },
    });

    await payment.save();

    // In production, this would integrate with Stripe
    // const stripeIntent = await stripe.paymentIntents.create({...});
    // payment.paymentIntentId = stripeIntent.id;

    logger.info(`Payment intent created: ${payment.transactionId}`);

    return sendSuccess(res, 201, { payment, clientSecret: `secret_${payment._id}` });
  }),

  /**
   * Confirm payment
   * POST /api/payments/confirm
   */
  confirmPayment: asyncHandler(async (req, res) => {
    const { paymentId } = req.body;

    const payment = await Payment.findById(paymentId).populate("booking");

    if (!payment) {
      throw new ApiError(404, "Payment not found");
    }

    if (payment.customer.toString() !== req.user._id.toString()) {
      throw new ApiError(403, "You can only confirm your own payments");
    }

    // In production, verify with Stripe
    // const intent = await stripe.paymentIntents.retrieve(payment.paymentIntentId);

    payment.status = "COMPLETED";
    await payment.save();

    // Confirm booking after successful payment
    await bookingService.confirmBooking(payment.booking._id, paymentId);

    logger.info(`Payment confirmed: ${payment.transactionId}`);

    return sendSuccess(res, 200, { payment }, "Payment confirmed successfully");
  }),

  /**
   * Get payment by ID
   * GET /api/payments/:id
   */
  getPayment: asyncHandler(async (req, res) => {
    const payment = await Payment.findById(req.params.id);

    if (!payment) {
      throw new ApiError(404, "Payment not found");
    }

    if (payment.customer.toString() !== req.user._id.toString()) {
      throw new ApiError(403, "You can only view your own payments");
    }

    return sendSuccess(res, 200, { payment }, "Payment retrieved successfully");
  }),

  /**
   * Get user's payments
   * GET /api/payments
   */
  getUserPayments: asyncHandler(async (req, res) => {
    const payments = await Payment.find({ customer: req.user._id })
      .populate("booking")
      .sort({ createdAt: -1 });

    return sendSuccess(res, 200, { payments }, "Payments retrieved successfully");
  }),

  /**
   * Refund payment
   * POST /api/payments/:id/refund
   */
  refundPayment: asyncHandler(async (req, res) => {
    const payment = await Payment.findById(req.params.id).populate("booking");

    if (!payment) {
      throw new ApiError(404, "Payment not found");
    }

    if (payment.status !== "COMPLETED") {
      throw new ApiError(400, "Can only refund completed payments");
    }

    const refundAmount = req.body.amount || payment.amount;

    if (refundAmount > payment.amount) {
      throw new ApiError(400, "Refund amount cannot exceed payment amount");
    }

    // In production, process refund with Stripe
    // await stripe.refunds.create({ payment_intent: payment.paymentIntentId });

    payment.status = "REFUNDED";
    payment.refund = {
      status: "COMPLETED",
      amount: refundAmount,
      reason: req.body.reason,
      processedAt: new Date(),
    };

    await payment.save();

    logger.info(`Payment refunded: ${payment.transactionId}, amount: ${refundAmount}`);

    return sendSuccess(res, 200, { payment }, "Payment refunded successfully");
  }),

  /**
   * Get payment receipt (for invoice)
   * GET /api/payments/:id/receipt
   */
  getReceipt: asyncHandler(async (req, res) => {
    const payment = await Payment.findById(req.params.id).populate({
      path: "booking",
      populate: [{ path: "room" }, { path: "hotel" }, { path: "customer" }],
    });

    if (!payment) {
      throw new ApiError(404, "Payment not found");
    }

    if (payment.customer.toString() !== req.user._id.toString()) {
      throw new ApiError(403, "You can only view your own receipts");
    }

    // Generate receipt data
    const receipt = {
      transactionId: payment.transactionId,
      date: payment.createdAt,
      amount: payment.amount,
      status: payment.status,
      booking: {
        bookingNumber: payment.booking.bookingNumber,
        checkInDate: payment.booking.checkInDate,
        checkOutDate: payment.booking.checkOutDate,
        nights: payment.booking.numberOfNights,
      },
      hotel: payment.booking.hotel.name,
      room: {
        number: payment.booking.room.roomNumber,
        type: payment.booking.room.roomType,
      },
    };

    return sendSuccess(res, 200, { receipt }, "Receipt generated successfully");
  }),
};
