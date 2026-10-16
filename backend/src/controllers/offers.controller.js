import { asyncHandler, ApiError } from "../utils/ApiError.js";
import { sendSuccess } from "../utils/response.js";
import { Offer } from "../models/Offer.model.js";

/**
 * Offers Controller
 */
export const offersController = {
  /**
   * Get all active offers
   * GET /api/offers
   */
  getAllOffers: asyncHandler(async (req, res) => {
    const { tags, page = 1, limit = 10 } = req.query;

    const query = {
      isActive: true,
      validFrom: { $lte: new Date() },
      validUntil: { $gte: new Date() },
    };

    if (tags) {
      query.tags = { $in: tags.split(",") };
    }

    const skip = (page - 1) * limit;

    const offers = await Offer.find(query)
      .skip(skip)
      .limit(parseInt(limit))
      .sort({ createdAt: -1 });

    const total = await Offer.countDocuments(query);

    return sendSuccess(res, 200, { offers, pagination: { total, page, limit } });
  }),

  /**
   * Get offer by code
   * GET /api/offers/:code
   */
  getOfferByCode: asyncHandler(async (req, res) => {
    const offer = await Offer.findOne({
      code: req.params.code.toUpperCase(),
      isActive: true,
    });

    if (!offer) {
      throw new ApiError(404, "Offer not found or expired");
    }

    // Check if offer is still valid
    const now = new Date();
    if (now < offer.validFrom || now > offer.validUntil) {
      throw new ApiError(400, "Offer has expired");
    }

    return sendSuccess(res, 200, { offer });
  }),

  /**
   * Create offer (Admin only)
   * POST /api/offers
   */
  createOffer: asyncHandler(async (req, res) => {
    const offer = new Offer(req.body);
    await offer.save();

    return sendSuccess(res, 201, { offer }, "Offer created successfully");
  }),

  /**
   * Update offer (Admin only)
   * PATCH /api/offers/:id
   */
  updateOffer: asyncHandler(async (req, res) => {
    const offer = await Offer.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!offer) {
      throw new ApiError(404, "Offer not found");
    }

    return sendSuccess(res, 200, { offer }, "Offer updated successfully");
  }),

  /**
   * Delete offer (Admin only)
   * DELETE /api/offers/:id
   */
  deleteOffer: asyncHandler(async (req, res) => {
    const offer = await Offer.findById(req.params.id);

    if (!offer) {
      throw new ApiError(404, "Offer not found");
    }

    offer.isActive = false;
    await offer.save();

    return sendSuccess(res, 200, null, "Offer deleted successfully");
  }),
};
