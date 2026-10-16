import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema(
  {
    bookingNumber: {
      type: String,
      unique: true,
      sparse: true,
      default: null,
    },
    customer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Customer reference is required"],
      index: true,
    },
    hotel: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Hotel",
      required: [true, "Hotel reference is required"],
      index: true,
    },
    room: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Room",
      required: [true, "Room reference is required"],
      index: true,
    },
    checkInDate: {
      type: Date,
      required: [true, "Check-in date is required"],
    },
    checkOutDate: {
      type: Date,
      required: [true, "Check-out date is required"],
    },
    numberOfGuests: {
      type: Number,
      required: [true, "Number of guests is required"],
      min: [1, "Must have at least 1 guest"],
    },
    numberOfNights: {
      type: Number,
      required: true,
    },
    pricePerNight: {
      type: Number,
      required: [true, "Price per night is required"],
      min: [0, "Price cannot be negative"],
    },
    discount: {
      type: Number,
      default: 0,
      min: [0, "Discount cannot be negative"],
    },
    taxes: {
      type: Number,
      default: 0,
      min: [0, "Taxes cannot be negative"],
    },
    totalAmount: {
      type: Number,
      required: [true, "Total amount is required"],
      min: [0, "Amount cannot be negative"],
    },
    status: {
      type: String,
      enum: {
        values: ["PENDING", "CONFIRMED", "CHECKED_IN", "CHECKED_OUT", "CANCELLED"],
        message: "Invalid booking status",
      },
      default: "PENDING",
      index: true,
    },
    payment: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Payment",
      default: null,
    },
    specialRequests: {
      type: String,
      maxlength: [500, "Special requests cannot exceed 500 characters"],
    },
    guestDetails: {
      firstName: String,
      lastName: String,
      email: String,
      phone: String,
    },
    cancellation: {
      cancelledAt: Date,
      cancelledBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
      reason: String,
      refundAmount: Number,
      refundStatus: {
        type: String,
        enum: {
          values: ["PENDING", "PROCESSED", "FAILED"],
          message: "Invalid refund status",
        },
        default: "PENDING",
      },
    },
    notes: [
      {
        createdBy: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
        },
        content: String,
        createdAt: { type: Date, default: Date.now },
      },
    ],
  },
  {
    timestamps: true,
    indexes: [
      { customer: 1 },
      { hotel: 1 },
      { room: 1 },
      { status: 1 },
      { checkInDate: 1, checkOutDate: 1 },
      { createdAt: -1 },
    ],
  }
);

/**
 * Pre-save middleware to generate booking number and calculate nights
 */
bookingSchema.pre("save", function (next) {
  if (!this.bookingNumber) {
    const timestamp = Date.now();
    const random = Math.floor(Math.random() * 10000);
    this.bookingNumber = `BK-${timestamp}-${random}`;
  }

  if (this.checkInDate && this.checkOutDate) {
    const inDate = new Date(this.checkInDate);
    const outDate = new Date(this.checkOutDate);
    this.numberOfNights = Math.ceil((outDate - inDate) / (1000 * 60 * 60 * 24));
  }

  next();
});

export const Booking = mongoose.model("Booking", bookingSchema);
