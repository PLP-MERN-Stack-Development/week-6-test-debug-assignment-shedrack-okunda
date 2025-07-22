describe("Login Flow", () => {
	it("should login existing user", () => {
		cy.visit("/login");
		cy.get('input[name="email"]', { timeout: 10000 }).should("exist");
		cy.get('input[name="email"]').type("testuser@example.com");
		cy.get('input[name="password"]').type("password123");
		cy.get("form").submit();
		cy.url().should("include", "/dashboard");
		cy.contains("Welcome");
	});
});
