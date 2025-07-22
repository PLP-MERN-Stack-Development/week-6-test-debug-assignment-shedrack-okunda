import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const RegisterForm = () => {
	const [username, setUsername] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [message, setMessage] = useState("");
	const [error, setError] = useState("");

	const navigate = useNavigate();

	const handleSubmit = async (e) => {
		e.preventDefault();
		setMessage("");
		setError("");

		if (!username || !email || !password) {
			setError("All fields are required");
			return;
		}

		try {
			const response = await fetch(
				"http://localhost:5000/api/auth/register",
				{
					method: "POST",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify({ username, email, password }),
				}
			);

			const data = await response.json();

			if (!response.ok) {
				throw new Error(data.message || "Registration failed");
			}

			// Save user info and redirect
			if (data.user) {
				localStorage.setItem("user", JSON.stringify(data.user));
			} else {
				throw new Error("Invalid user data received");
			}
			setMessage("Registration successful");
			navigate("/dashboard");
		} catch (err) {
			setError(err.message);
		}
	};

	return (
		<form
			onSubmit={handleSubmit}
			data-testid="register-form"
			className="max-w-md mx-auto space-y-4">
			<h2 className="text-xl font-bold">Register</h2>

			{error && (
				<div role="alert" className="text-red-600">
					{error}
				</div>
			)}
			{message && (
				<div role="status" className="text-green-600">
					{message}
				</div>
			)}

			<div>
				<label>Username:</label>
				<input
					type="text"
					name="username"
					value={username}
					onChange={(e) => setUsername(e.target.value)}
					className="border p-2 w-full"
					data-testid="username-input"
				/>
			</div>

			<div>
				<label>Email:</label>
				<input
					type="email"
					name="email"
					value={email}
					onChange={(e) => setEmail(e.target.value)}
					className="border p-2 w-full"
					data-testid="email-input"
				/>
			</div>

			<div>
				<label>Password:</label>
				<input
					type="password"
					name="password"
					value={password}
					onChange={(e) => setPassword(e.target.value)}
					className="border p-2 w-full"
					data-testid="password-input"
				/>
			</div>

			<button
				type="submit"
				className="bg-green-500 text-white px-4 py-2 rounded">
				Register
			</button>
		</form>
	);
};

export default RegisterForm;
