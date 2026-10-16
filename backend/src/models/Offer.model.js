import mongoose from "mongoose";

const offerSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Offer title is required"],
      trim: true,
      minlength: [5, "Title must be at least 5 characters"],
      maxlength: [100, "Title cannot exceed 100 characters"],
    },
    description: {
      type: String,
      required: [true, "Description is required"],
      minlength: [10, "Description must be at least 10 characters"],
    },
    code: {
      type: String,
      unique: true,
      uppercase: true,
      required: [true, "Offer code is required"],
      match: [/^[A-Z0-9]{3,20}$/, "Code must be 3-20 alphanumeric characters"],
    },
    discountType: {
      type: String,
      enum: {
        values: ["PERCENTAGE", "FIXED_AMOUNT"],
        message: "Invalid discount type. Must be PERCENTAGE or FIXED_AMOUNT",
      },
      required: [true, "Discount type is required"],
    },
    discountValue: {
      type: Number,
      required: [true, "Discount value is required"],
      min: [0, "Discount cannot be negative"],
    },
    maxDiscount: {
      type: Number,
      default: null, // For percentage discounts, maximum discount amount
    },
    minBookingAmount: {
      type: Number,
      default: 0,
    },
    applicableRoomTypes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "RoomType",
      },
    ],
    applicableHotels: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Hotel",
      },
    ],
    validFrom: {
      type: Date,
      required: [true, "Valid from date is required"],
    },
    validUntil: {
      type: Date,
      required: [true, "Valid until date is required"],
    },
    maxUsagePerCustomer: {
      type: Number,
      default: 1,
      min: [1, "Max usage must be at least 1"],
    },
    totalUsageLimit: {
      type: Number,
      default: null, // null = unlimited
    },
    currentUsage: {
      type: Number,
      default: 0,
    },
    usedBy: [
      {
        userId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
        },
        usedAt: { type: Date, default: Date.now },
      },
    ],
    image: {
      type: String,
      default: null,
    },
    isActive: {
      type: Boolean,
      default: true,
      index: true,
    },
    tags: [String],
  },
  {
    timestamps: true,
    indexes: [
      { code: 1, unique: true },
      { isActive: 1 },
      { validFrom: 1, validUntil: 1 },
    ],
  }
);

export const Offer = mongoose.model("Offer", offerSchema);
