const User = require("../models/User");
const bcrypt = require("bcryptjs");

const register = async (req, res) => {
	try {
		const { username, email, password } = req.body;

		const hashedPassword = await bcrypt.hash(password, 10);

		const user = new User({ username, email, password: hashedPassword });
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
		const isMatch = await bcrypt.compare(password, user.password);

		if (!isMatch) {
			return res.status(401).json({ message: "Invalid credentials" });
		}

		res.status(200).json({ message: "Login successful" });
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

module.exports = { register, login };
