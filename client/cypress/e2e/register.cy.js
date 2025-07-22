describe("User Registration Flow", () => {
	it("should register a new user", () => {
		cy.visit("/register");
		cy.get('input[name="username"]').type("testuser");
		cy.get('input[name="email"]').type("testuser@example.com");
		cy.get('input[name="password"]').type("password123");
		cy.get("form").submit();
		cy.url().should("include", "/dashboard");
	});
});
