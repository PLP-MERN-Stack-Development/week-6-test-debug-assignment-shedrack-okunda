describe("Form Validation", () => {
	it("should show error on invalid email", () => {
		cy.visit("/register");
		cy.get('input[name="email"]').type("not-an-email");
		cy.get("form").submit();
		cy.contains("Invalid email");
	});

	it("should reject empty fields", () => {
		cy.visit("/login");
		cy.get("form").submit();
		cy.contains("All fields are required");
	});
});
