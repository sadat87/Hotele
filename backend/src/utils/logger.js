/**
 * Logger utility for consistent logging across the application
 * Supports different log levels and timestamps
 */

const LOG_LEVELS = {
  ERROR: 0,
  WARN: 1,
  INFO: 2,
  DEBUG: 3,
};

const getCurrentTimestamp = () => {
  return new Date().toISOString();
};

export const logger = {
  error: (message, error = null) => {
    console.error(`[ERROR] ${getCurrentTimestamp()} - ${message}`, error || "");
  },

  warn: (message) => {
    console.warn(`[WARN] ${getCurrentTimestamp()} - ${message}`);
  },

  info: (message) => {
    console.log(`[INFO] ${getCurrentTimestamp()} - ${message}`);
  },

  debug: (message, data = null) => {
    if (process.env.NODE_ENV === "development") {
      console.log(`[DEBUG] ${getCurrentTimestamp()} - ${message}`, data || "");
    }
  },
};
