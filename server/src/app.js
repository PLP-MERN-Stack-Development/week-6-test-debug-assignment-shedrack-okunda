const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const postRoutes = require("./routes/posts");

dotenv.config();

const app = express();
app.use(express.json());

// Routes
app.use("/api/posts", postRoutes);

// Connect to MongoDB
mongoose
	.connect(process.env.MONGO_URI, {})
	.then(() => console.log("MongoDB Connected"))
	.catch((err) => console.error(err));

app.listen(process.env.PORT, () => {
	console.log("Server is running on port 5000");
});
module.exports = app;
