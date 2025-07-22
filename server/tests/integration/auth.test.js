const request = require("supertest");
const mongoose = require("mongoose");
const app = require("../../src/app");
const User = require("../../src/models/User");
require("dotenv").config({ path: ".env.test" });

beforeAll(async () => {
	await mongoose.connect(process.env.MONGO_URI);
});

afterEach(async () => {
	await User.deleteMany({});
});

afterAll(async () => {
	await mongoose.connection.close();
});

describe("Auth API Integration", () => {
	it("should register a user", async () => {
		const res = await request(app).post("/api/auth/register").send({
			email: "test@example.com",
			password: "123456",
		});

		expect(res.statusCode).toBe(201);
		expect(res.body.message).toBe("User registered successfully");
	});

	it("should login a user", async () => {
		await request(app).post("/api/auth/register").send({
			email: "test@example.com",
			password: "123456",
		});

		const res = await request(app).post("/api/auth/login").send({
			email: "test@example.com",
			password: "123456",
		});

		expect(res.statusCode).toBe(200);
		expect(res.body.message).toBe("Login successful");
	});

	it("should not login invalid credentials", async () => {
		const res = await request(app).post("/api/auth/login").send({
			email: "wrong@example.com",
			password: "wrong",
		});

		expect(res.statusCode).toBe(401);
		expect(res.body.message).toBe("Invalid credentials");
	});
});
