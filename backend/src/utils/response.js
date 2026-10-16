/**
 * Standardized API response format
 */
export class ApiResponse {
  constructor(statusCode, data, message = "Success") {
    this.statusCode = statusCode;
    this.data = data;
    this.message = message;
    this.success = statusCode < 400;
  }
}

/**
 * Helper to send success responses
 */
export const sendSuccess = (res, statusCode, data, message = "Success") => {
  return res.status(statusCode).json(new ApiResponse(statusCode, data, message));
};

/**
 * Helper to send error responses
 */
export const sendError = (res, statusCode, message, errors = null) => {
  return res.status(statusCode).json({
    statusCode,
    message,
    errors,
    success: false,
  });
};
