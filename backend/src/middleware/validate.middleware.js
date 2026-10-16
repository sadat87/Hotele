import { z } from "zod";
import { ApiError } from "../utils/ApiError.js";

/**
 * Middleware factory to validate request data against Zod schema
 */
export const validate = (schema) => {
  return (req, res, next) => {
    try {
      // Try to validate body, params, and query
      const data = {
        body: req.body,
        params: req.params,
        query: req.query,
      };

      const validated = schema.parse(data);

      // Update request with validated data
      req.body = validated.body || req.body;
      req.params = validated.params || req.params;
      req.query = validated.query || req.query;

      next();
    } catch (error) {
      if (error instanceof z.ZodError) {
        const errors = error.errors.reduce((acc, err) => {
          const path = err.path.join(".");
          acc[path] = err.message;
          return acc;
        }, {});

        throw new ApiError(400, "Validation failed", errors);
      }

      throw error;
    }
  };
};

/**
 * Simple body validation middleware
 */
export const validateBody = (schema) => {
  return (req, res, next) => {
    try {
      req.body = schema.parse(req.body);
      next();
    } catch (error) {
      if (error instanceof z.ZodError) {
        const errors = error.errors.reduce((acc, err) => {
          const path = err.path.join(".");
          acc[path] = err.message;
          return acc;
        }, {});

        throw new ApiError(400, "Validation failed", errors);
      }

      throw error;
    }
  };
};
