describe("CRUD Posts", () => {
	before(() => {
		cy.visit("/login");
		cy.get('input[name="email"]').type("testuser@example.com");
		cy.get('input[name="password"]').type("password123");
		cy.get("form").submit();
	});

	it("should create a post", () => {
		cy.contains("New Post").click();
		cy.get('textarea[name="content"]').type("This is a new post");
		cy.get("form").submit();
		cy.contains("This is a new post");
	});

	it("should update a post", () => {
		cy.contains("Edit").click();
		cy.get('textarea[name="content"]').clear().type("Updated post");
		cy.get("form").submit();
		cy.contains("Updated post");
	});

	it("should delete a post", () => {
		cy.contains("Delete").click();
		cy.on("window:confirm", () => true);
		cy.contains("Updated post").should("not.exist");
	});
});
