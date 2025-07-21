const Post = require("../models/Post");

const getPosts = async (req, res) => {
	try {
		const posts = await Post.find().populate("author", "username");
		res.status(200).json(posts);
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

const createPost = async (req, res) => {
	try {
		const { title, content } = req.body;

		const newPost = new Post({
			title,
			content,
			author: req.user.id,
		});

		const savedPost = await newPost.save();
		res.status(201).json(savedPost);
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

module.exports = { getPosts, createPost };
