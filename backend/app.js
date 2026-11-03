const express = require("express");
const cors = require("cors");

const healthRoutes = require("./routes/health.routes");

const app = express();

// Application-level middleware
app.use(cors());
app.use(express.json());

// Application routes
app.use("/api", healthRoutes);

module.exports = app;
