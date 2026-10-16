import mongoose from "mongoose";
import bcrypt from "bcrypt";
import { env } from "../config/env.js";

/**
 * ROLES:
 * - ADMIN: Full system access, user management, analytics
 * - MANAGER: Hotel management, staff control, bookings oversight
 * - STAFF: Check-ins, check-outs, guest support
 * - CUSTOMER: Book rooms, manage bookings, profile
 */

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: [true, "First name is required"],
      trim: true,
      minlength: [2, "First name must be at least 2 characters"],
      maxlength: [50, "First name cannot exceed 50 characters"],
    },
    lastName: {
      type: String,
      required: [true, "Last name is required"],
      trim: true,
      minlength: [2, "Last name must be at least 2 characters"],
      maxlength: [50, "Last name cannot exceed 50 characters"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, "Invalid email format"],
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: [6, "Password must be at least 6 characters"],
      select: false, // Don't return password by default
    },
    phone: {
      type: String,
      trim: true,
      match: [/^[\d\s\-\+\(\)]+$/, "Invalid phone number format"],
    },
    avatar: {
      type: String,
      default: null,
    },
    role: {
      type: String,
      enum: {
        values: ["ADMIN", "MANAGER", "STAFF", "CUSTOMER"],
        message: "Invalid role. Must be ADMIN, MANAGER, STAFF, or CUSTOMER",
      },
      default: "CUSTOMER",
      index: true,
    },
    isActive: {
      type: Boolean,
      default: true,
      index: true,
    },
    isEmailVerified: {
      type: Boolean,
      default: false,
    },
    emailVerificationToken: {
      type: String,
      default: null,
    },
    emailVerificationTokenExpiry: {
      type: Date,
      default: null,
    },
    passwordResetToken: {
      type: String,
      default: null,
    },
    passwordResetTokenExpiry: {
      type: Date,
      default: null,
    },
    refreshTokens: [
      {
        token: String,
        createdAt: { type: Date, default: Date.now, expires: 604800 }, // 7 days
      },
    ],
    lastLoginAt: {
      type: Date,
      default: null,
    },
    address: {
      street: String,
      city: String,
      state: String,
      postalCode: String,
      country: String,
    },
    metadata: {
      totalBookings: { type: Number, default: 0 },
      totalSpent: { type: Number, default: 0 },
      preferredPaymentMethod: String,
    },
  },
  {
    timestamps: true,
    indexes: [
      { email: 1, unique: true },
      { role: 1 },
      { isActive: 1 },
      { createdAt: 1 },
    ],
  }
);

/**
 * Pre-save middleware to hash password if modified
 */
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  try {
    const salt = await bcrypt.genSalt(env.BCRYPT_ROUNDS);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

/**
 * Method to compare password with hashed password
 */
userSchema.methods.comparePassword = async function (candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

/**
 * Method to get safe user data (without sensitive fields)
 */
userSchema.methods.toJSON = function () {
  const obj = this.toObject();
  delete obj.password;
  delete obj.refreshTokens;
  delete obj.emailVerificationToken;
  delete obj.passwordResetToken;
  return obj;
};

export const User = mongoose.model("User", userSchema);
