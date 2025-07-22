const User = require("../models/User");
const bcrypt = require("bcryptjs");

const register = async (req, res) => {
	try {
		const { email, password } = req.body;
		console.log("REQ BODY", req.body);

		const hashedPassword = await bcrypt.hash(password, 10);

		const user = new User({ email, password: hashedPassword });
		await user.save();
		res.status(201).json({ message: "User registered successfully" });
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

const login = async (req, res) => {
	try {
		const { email, password } = req.body;
		const user = await User.findOne({ email });

		if (!user || user.password !== password) {
			return res.status(401).json({ message: "Invalid credentials" });
		}

		res.status(200).json({ message: "Login successful" });
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

module.exports = { register, login };
