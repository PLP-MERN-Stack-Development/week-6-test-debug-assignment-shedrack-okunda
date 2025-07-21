const express = require("express");
const router = express.Router();
const { getPosts, createPost } = require("../controllers/postController");
const { protect } = require("../middleware/authMiddleware");

// Public route to get all posts
router.get("/", getPosts);

// Protected route to create a new post
router.post("/", protect, createPost);

module.exports = router;
