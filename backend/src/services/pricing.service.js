import { RoomType } from "../models/RoomType.model.js";
import { Offer } from "../models/Offer.model.js";
import { ApiError } from "../utils/ApiError.js";

/**
 * Pricing service for dynamic pricing calculations
 */
export const pricingService = {
  /**
   * Calculate price for a booking
   */
  calculatePrice: async (roomId, checkInDate, checkOutDate, numberOfGuests, offerCode = null) => {
    // Get room type with pricing
    const roomType = await RoomType.findById(roomId);

    if (!roomType) {
      throw new ApiError(404, "Room not found");
    }

    // Calculate number of nights
    const nights = Math.ceil((checkOutDate - checkInDate) / (1000 * 60 * 60 * 24));

    if (nights <= 0) {
      throw new ApiError(400, "Invalid date range");
    }

    // Get base price
    let pricePerNight = roomType.basePrice;

    // Apply room type discount if applicable
    if (
      roomType.discount.percentage > 0 &&
      roomType.discount.validFrom &&
      roomType.discount.validUntil &&
      checkInDate >= roomType.discount.validFrom &&
      checkOutDate <= roomType.discount.validUntil
    ) {
      const discountAmount = (pricePerNight * roomType.discount.percentage) / 100;
      pricePerNight -= discountAmount;
    }

    // Apply dynamic pricing based on season
    pricePerNight = this.applyDynamicPricing(pricePerNight, checkInDate, checkOutDate);

    // Calculate subtotal
    let subtotal = pricePerNight * nights;
    let discount = 0;
    let taxes = 0;

    // Apply offer code if provided
    if (offerCode) {
      const offer = await Offer.findOne({ code: offerCode, isActive: true });

      if (!offer) {
        throw new ApiError(400, "Invalid or expired offer code");
      }

      // Check offer validity
      const now = new Date();
      if (now < offer.validFrom || now > offer.validUntil) {
        throw new ApiError(400, "Offer has expired");
      }

      // Check usage limits
      if (offer.totalUsageLimit && offer.currentUsage >= offer.totalUsageLimit) {
        throw new ApiError(400, "Offer usage limit exceeded");
      }

      // Check minimum booking amount
      if (subtotal < offer.minBookingAmount) {
        throw new ApiError(
          400,
          `Minimum booking amount of ${offer.minBookingAmount} required for this offer`
        );
      }

      // Calculate discount
      if (offer.discountType === "PERCENTAGE") {
        discount = (subtotal * offer.discountValue) / 100;
        if (offer.maxDiscount) {
          discount = Math.min(discount, offer.maxDiscount);
        }
      } else {
        discount = offer.discountValue;
      }
    }

    // Calculate taxes (assuming 10% tax rate)
    taxes = Math.round((subtotal - discount) * 0.1 * 100) / 100;

    const totalAmount = Math.round((subtotal - discount + taxes) * 100) / 100;

    return {
      numberOfNights: nights,
      pricePerNight: Math.round(pricePerNight * 100) / 100,
      subtotal: Math.round(subtotal * 100) / 100,
      discount: Math.round(discount * 100) / 100,
      taxes: Math.round(taxes * 100) / 100,
      totalAmount,
    };
  },

  /**
   * Apply dynamic pricing based on season and demand
   */
  applyDynamicPricing: (basePrice, checkInDate, checkOutDate) => {
    // Simple seasonal pricing (can be enhanced with ML/demand analysis)
    const month = checkInDate.getMonth();

    // Peak season: June-August, December
    const isPeakSeason = [5, 6, 7, 11].includes(month);

    // Off-season multiplier
    if (isPeakSeason) {
      return basePrice * 1.3; // 30% increase during peak season
    }

    return basePrice;
  },

  /**
   * Calculate revenue for a period
   */
  calculateRevenue: async (hotelId, startDate, endDate) => {
    const { Booking } = require("../models/Booking.model.js");

    const bookings = await Booking.find({
      hotel: hotelId,
      status: { $ne: "CANCELLED" },
      checkInDate: { $gte: startDate },
      checkOutDate: { $lte: endDate },
    });

    const revenue = bookings.reduce((total, booking) => total + booking.totalAmount, 0);

    return {
      revenue: Math.round(revenue * 100) / 100,
      bookingCount: bookings.length,
      averageBookingValue: bookings.length > 0 ? Math.round((revenue / bookings.length) * 100) / 100 : 0,
    };
  },
};
