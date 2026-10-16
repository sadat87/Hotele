import mongoose from "mongoose";

const paymentSchema = new mongoose.Schema(
  {
    transactionId: {
      type: String,
      unique: true,
      sparse: true,
    },
    booking: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Booking",
      required: [true, "Booking reference is required"],
      index: true,
    },
    customer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Customer reference is required"],
      index: true,
    },
    amount: {
      type: Number,
      required: [true, "Amount is required"],
      min: [0, "Amount cannot be negative"],
    },
    currency: {
      type: String,
      default: "USD",
    },
    paymentMethod: {
      type: String,
      enum: {
        values: ["CREDIT_CARD", "DEBIT_CARD", "BANK_TRANSFER", "PAYPAL", "WALLET"],
        message: "Invalid payment method",
      },
      required: [true, "Payment method is required"],
    },
    paymentIntentId: {
      type: String, // For Stripe integration
      default: null,
    },
    status: {
      type: String,
      enum: {
        values: ["PENDING", "PROCESSING", "COMPLETED", "FAILED", "REFUNDED"],
        message: "Invalid payment status",
      },
      default: "PENDING",
      index: true,
    },
    cardDetails: {
      lastFourDigits: String,
      cardBrand: String, // VISA, MASTERCARD, etc.
      expiryMonth: Number,
      expiryYear: Number,
    },
    bankDetails: {
      accountNumber: String,
      bankName: String,
      routingNumber: String,
    },
    failureReason: {
      type: String,
      default: null,
    },
    receipt: {
      type: String, // URL to receipt document
      default: null,
    },
    metadata: {
      ipAddress: String,
      userAgent: String,
      referer: String,
    },
    refund: {
      status: {
        type: String,
        enum: {
          values: ["NOT_APPLICABLE", "PENDING", "COMPLETED", "FAILED"],
          message: "Invalid refund status",
        },
        default: "NOT_APPLICABLE",
      },
      amount: {
        type: Number,
        default: 0,
      },
      reason: String,
      processedAt: Date,
    },
  },
  {
    timestamps: true,
    indexes: [
      { booking: 1 },
      { customer: 1 },
      { status: 1 },
      { createdAt: -1 },
      { transactionId: 1, unique: true, sparse: true },
    ],
  }
);

/**
 * Pre-save middleware to generate transaction ID
 */
paymentSchema.pre("save", function (next) {
  if (!this.transactionId) {
    const timestamp = Date.now();
    const random = Math.floor(Math.random() * 100000);
    this.transactionId = `TXN-${timestamp}-${random}`;
  }
  next();
});

export const Payment = mongoose.model("Payment", paymentSchema);
