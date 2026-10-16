import app from "./src/app.js";
import { env } from "./src/config/env.js";
import { connectDB } from "./src/config/db.js";
import { logger } from "./src/utils/logger.js";

const PORT = env.PORT;

const startServer = async () => {
  try {
    // Connect to MongoDB (non-blocking if fails)
    await connectDB();

    // Start Express server
    const server = app.listen(PORT, () => {
      logger.info(`🚀 Server running on port ${PORT}`);
      logger.info(`📝 Environment: ${env.NODE_ENV}`);
      logger.info(`🌐 CORS Origin: ${env.CORS_ORIGIN}`);
      logger.info(`🔗 Access at: http://localhost:${PORT}`);
      logger.info(`✅ Health check: http://localhost:${PORT}/health`);
    });

    // Graceful shutdown
    process.on("SIGTERM", async () => {
      logger.info("SIGTERM signal received: closing HTTP server");
      server.close(async () => {
        logger.info("HTTP server closed");
        await import("./src/config/db.js").then((m) => m.disconnectDB());
        process.exit(0);
      });
    });

    process.on("SIGINT", async () => {
      logger.info("SIGINT signal received: closing HTTP server");
      server.close(async () => {
        logger.info("HTTP server closed");
        await import("./src/config/db.js").then((m) => m.disconnectDB());
        process.exit(0);
      });
    });
  } catch (error) {
    logger.error("❌ Failed to start server", error);
    process.exit(1);
  }
};

startServer();
