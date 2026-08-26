describe("Fur Missile authentication", () => {

  // TEST 1 — Login page loads correctly
  it("shows the login page", () => {
    cy.visit("http://localhost:5173/login");

    cy.contains("h1", "Login").should("be.visible");

    cy.get('input[name="email"]').should("be.visible");

    cy.get('input[name="password"]').should("be.visible");

    cy.get('button[type="submit"]')
      .contains("Login")
      .should("be.visible");
  });


  // TEST 2 — Invalid credentials show an error
  it("shows an error for invalid login credentials", () => {
    cy.visit("http://localhost:5173/login");

    cy.get('input[name="email"]').type(
      "notarealuser@example.com"
    );

    cy.get('input[name="password"]').type(
      "wrongpassword"
    );

    cy.get('button[type="submit"]').click();

    cy.contains(
      "Login failed. Check your email and password."
    ).should("be.visible");
  });


  // TEST 3 — Valid credentials log the user in
it("logs in with valid credentials", () => {
  cy.visit("http://localhost:5173/login");

  cy.env(["testEmail", "testPassword"]).then(
    ({ testEmail, testPassword }) => {
      cy.get('input[name="email"]').type(
        testEmail
      );

      cy.get('input[name="password"]').type(
        testPassword
      );
    }
  );

  cy.get('button[type="submit"]').click();

  cy.url().should("include", "/dogs");

  cy.contains("Dogs").should("be.visible");
});

});