import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // ✅ import useNavigate

const LoginForm = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [message, setMessage] = useState("");
	const [error, setError] = useState("");

	const navigate = useNavigate(); // ✅ initialize navigate

	const handleSubmit = async (e) => {
		e.preventDefault();
		setMessage("");
		setError("");

		if (!email || !password) {
			setError("All fields are required");
			return;
		}

		try {
			const response = await fetch(
				"http://localhost:5000/api/auth/login",
				{
					method: "POST",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify({ email, password }),
				}
			);

			const data = await response.json();

			if (!response.ok) {
				throw new Error(data.message || "Login failed");
			}

			if (data.user) {
				localStorage.setItem("user", JSON.stringify(data.user));
			} else {
				throw new Error("Invalid user data received");
			}

			setMessage("Login successful");

			navigate("/dashboard");
		} catch (err) {
			setError(err.message);
		}
	};

	return (
		<form
			onSubmit={handleSubmit}
			data-testid="login-form"
			className="mt-10 max-w-md mx-auto  space-y-4">
			<h2 className="text-xl font-bold">Login</h2>

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
				<label>Email:</label>
				<input
					type="email"
					name="email"
					value={email}
					onChange={(e) => setEmail(e.target.value)}
					data-testid="email-input"
					className="border p-2 w-full"
				/>
			</div>

			<div>
				<label>Password:</label>
				<input
					type="password"
					name="password"
					value={password}
					onChange={(e) => setPassword(e.target.value)}
					data-testid="password-input"
					className="border p-2 w-full"
				/>
			</div>

			<button
				type="submit"
				className="bg-blue-500 text-white px-4 py-2 rounded">
				Login
			</button>
		</form>
	);
};

export default LoginForm;
