import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import LoginForm from "../../components/LoginForm";

beforeEach(() => {
	global.fetch = jest.fn(() =>
		Promise.resolve({
			ok: true,
			json: () => Promise.resolve({ message: "Login successful" }),
		})
	);
});

afterEach(() => {
	jest.restoreAllMocks();
});

describe("LoginForm Integration Test", () => {
	it("should display success on valid submission", async () => {
		render(<LoginForm />);

		fireEvent.change(screen.getByTestId("email-input"), {
			target: { value: "test@example.com" },
		});

		fireEvent.change(screen.getByTestId("password-input"), {
			target: { value: "123456" },
		});

		fireEvent.click(screen.getByRole("button", { name: /login/i }));

		await waitFor(() => {
			expect(screen.getByRole("status")).toHaveTextContent(
				"Login successful"
			);
		});
	});

	it("should show error when fields are empty", async () => {
		render(<LoginForm />);
		fireEvent.click(screen.getByRole("button", { name: /login/i }));

		expect(await screen.findByRole("alert")).toHaveTextContent(
			"All fields are required"
		);
	});

	it("should show error on failed login", async () => {
		global.fetch = jest.fn(() =>
			Promise.resolve({
				ok: false,
				json: () => Promise.resolve({ message: "Invalid credentials" }),
			})
		);

		render(<LoginForm />);
		fireEvent.change(screen.getByTestId("email-input"), {
			target: { value: "wrong@example.com" },
		});
		fireEvent.change(screen.getByTestId("password-input"), {
			target: { value: "wrong" },
		});

		fireEvent.click(screen.getByRole("button", { name: /login/i }));

		await waitFor(() => {
			expect(screen.getByRole("alert")).toHaveTextContent(
				"Invalid credentials"
			);
		});
	});
});
