const express = require("express");
const cors = require("cors");

const healthRoutes = require("./routes/health.routes");
const notFoundMiddleware = require("./middleware/not-found.middleware");
const errorMiddleware = require("./middleware/error.middleware");

const app = express();

app.use(cors());
app.use(express.json());

// API routes
app.use("/api/health", healthRoutes);

// Handle unknown routes
app.use(notFoundMiddleware);

// Centralized error handling (must be last)
app.use(errorMiddleware);

module.exports = app;
