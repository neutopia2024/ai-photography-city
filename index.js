const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const bodyParser = require("body-parser");
const { initializeDatabase } = require('./src/db/init'); 
const logger = require("./src/config/logger");
const characterRoutes = require("./src/routes/character-routes");
const locationRoutes = require('./src/routes/location-routes'); // Fixed path
const errorHandler = require("./src/middleware/error-handler");

const app = express();

// Middleware
app.use(helmet());
app.use(cors());
app.use(bodyParser.json());

// Basic health check endpoint
app.get("/health", (req, res) => {
  res.json({ status: "healthy", timestamp: new Date() });
});

// Routes
app.use("/api/v1/characters", characterRoutes);
app.use('/api/v1/locations', locationRoutes);  // Moved after middleware

// Error handler - must be last
app.use(errorHandler);

// Initialize database and start server
const PORT = process.env.PORT || 3000;

const startServer = async () => {
  try {
    await initializeDatabase();
    app.listen(PORT, () => {
      logger.info(`Server running on port ${PORT}`);
    });
  } catch (error) {
    logger.error("Server failed to start:", error);
    process.exit(1);
  }
};

startServer();