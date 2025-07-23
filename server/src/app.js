const express = require("express");
const dotenv = require("dotenv");
const postRoutes = require("./routes/post");
const authRoutes = require("./routes/auth");
const cors = require("cors");
const compression = require("compression");
const logger = require("./middleware/logger");
const errorHandler = require("./middleware/errorHandler");

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());
app.use(logger);
app.use(compression());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/posts", postRoutes);

app.use(errorHandler);

module.exports = app;
