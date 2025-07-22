const express = require("express");
const dotenv = require("dotenv");
const postRoutes = require("./routes/post");
const authRoutes = require("./routes/auth");
const cors = require('cors')

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors())

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/posts", postRoutes);

module.exports = app;
