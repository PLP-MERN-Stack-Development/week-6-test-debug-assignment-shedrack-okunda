import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
	const navigate = useNavigate();
	let user = null;

	try {
		const storedUser = localStorage.getItem("user");
		if (storedUser && storedUser !== "undefined") {
			user = JSON.parse(storedUser);
		}
	} catch (err) {
		console.error("Failed to parse user from localStorage:", err);
	}

	useEffect(() => {
		try {
			const storedUser = localStorage.getItem("user");
			if (storedUser && storedUser !== "undefined") {
				const parsedUser = JSON.parse(storedUser);
				if (!parsedUser?.email || !parsedUser?.username) {
					navigate("/login");
				}
			} else {
				navigate("/login");
			}
		} catch (err) {
			console.error("Failed to parse user from localStorage:", err);
			navigate("/login");
		}
	}, [navigate]);

	if (!user) {
		return null; // prevent rendering while redirecting
	}

	return (
		<div className="p-4">
			<h1 className="text-2xl font-bold">Welcome to your dashboard</h1>
			<p className="mt-2">
				Hello, <strong>{user.username}</strong>!
			</p>
			<p>Email: {user.email}</p>
		</div>
	);
};

export default Dashboard;
