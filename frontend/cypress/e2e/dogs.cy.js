describe("Dogs Page", () => {
  // TEST #4 — Logged-in user can view the Dogs page
  it("allows a logged-in user to view the Dogs page", () => {
    cy.visit("http://localhost:5173/login");

    cy.env(["testEmail", "testPassword"]).then(
      ({ testEmail, testPassword }) => {
        cy.get('input[name="email"]').type(testEmail);

        cy.get('input[name="password"]').type(testPassword);
      }
    );

    cy.get('button[type="submit"]').click();

    cy.url().should("include", "/dogs");

    cy.contains("h1", "Working Dogs").should("be.visible");
    cy.contains("h2", "Add Working Dog").should("be.visible");
    cy.contains("h2", "Your Working Dogs").should("be.visible");
  });

describe("Dogs Page", () => {
  // TEST #4 — Logged-in user can view the Dogs page
  it("allows a logged-in user to view the Dogs page", () => {
    cy.visit("http://localhost:5173/login");

    cy.env(["testEmail", "testPassword"]).then(
      ({ testEmail, testPassword }) => {
        cy.get('input[name="email"]').type(testEmail);
        cy.get('input[name="password"]').type(testPassword);
      }
    );

    cy.get('button[type="submit"]').click();

    cy.url().should("include", "/dogs");

    cy.contains("h1", "Working Dogs").should("be.visible");
    cy.contains("h2", "Add Working Dog").should("be.visible");
    cy.contains("h2", "Your Working Dogs").should("be.visible");
  });

  // TEST #5 — Logged-in user can create a Working Dog
  it("allows a logged-in user to create a Working Dog", () => {
    cy.visit("http://localhost:5173/login");

    cy.env(["testEmail", "testPassword"]).then(
      ({ testEmail, testPassword }) => {
        cy.get('input[name="email"]').type(testEmail);
        cy.get('input[name="password"]').type(testPassword);
      }
    );

    cy.get('button[type="submit"]').click();

    cy.get('input[name="name"]').type("Cypress Create");
    cy.get('input[name="breed"]').type("Belgian Malinois");
    cy.get('input[name="role"]').type("Testing");
    cy.get('select[name="gender"]').select("Male");
    cy.get('input[name="age"]').type("4");
    cy.get('input[name="call_sign"]').type("Create Dog");
    cy.get('textarea[name="notes"]').type(
      "Created automatically by Cypress."
    );

    cy.contains("button", "Add Dog").click();

    cy.contains("a", "Cypress Create").should("be.visible");
    cy.contains("Belgian Malinois - Testing").should("be.visible");
  });

  // TEST #6 — Logged-in user can open a Working Dog detail page
  it("allows a logged-in user to open a Working Dog detail page", () => {
    cy.visit("http://localhost:5173/login");

    cy.env(["testEmail", "testPassword"]).then(
      ({ testEmail, testPassword }) => {
        cy.get('input[name="email"]').type(testEmail);
        cy.get('input[name="password"]').type(testPassword);
      }
    );

    cy.get('button[type="submit"]').click();

    cy.get('input[name="name"]').type("Cypress Detail");
    cy.get('input[name="breed"]').type("Belgian Malinois");
    cy.get('input[name="role"]').type("Patrol");
    cy.get('select[name="gender"]').select("Female");
    cy.get('input[name="age"]').type("5");
    cy.get('input[name="call_sign"]').type("Detail Dog");

    cy.contains("button", "Add Dog").click();

    cy.contains("a", "Cypress Detail").click();

    cy.url().should("include", "/dogs/");

    cy.contains("h1", "Cypress Detail").should("be.visible");
    cy.contains("Breed: Belgian Malinois").should("be.visible");
    cy.contains("Role: Patrol").should("be.visible");
    cy.contains("Gender: Female").should("be.visible");
    cy.contains("Call sign: Detail Dog").should("be.visible");
    cy.contains("h2", "Earned Mission Badges").should("be.visible");
    cy.contains("button", "Update Dog").should("be.visible");
    cy.contains("button", "Delete Dog").should("be.visible");
  });

  // TEST #7 — Logged-in user can update a Working Dog
  it("allows a logged-in user to update a Working Dog", () => {
    cy.visit("http://localhost:5173/login");

    cy.env(["testEmail", "testPassword"]).then(
      ({ testEmail, testPassword }) => {
        cy.get('input[name="email"]').type(testEmail);
        cy.get('input[name="password"]').type(testPassword);
      }
    );

    cy.get('button[type="submit"]').click();

    cy.get('input[name="name"]').type("Cypress Update");
    cy.get('input[name="breed"]').type("Belgian Malinois");
    cy.get('input[name="role"]').type("Testing");
    cy.get('select[name="gender"]').select("Male");
    cy.get('input[name="age"]').type("4");
    cy.get('input[name="call_sign"]').type("Before Update");

    cy.contains("button", "Add Dog").click();

    cy.contains("a", "Cypress Update").click();

    cy.get('input[name="role"]').clear().type("Search and Rescue");

    cy.get('input[name="call_sign"]').clear().type("Bug Slayer");

    cy.get('textarea[name="notes"]')
      .clear()
      .type("Updated automatically by Cypress.");

    cy.contains("button", "Update Dog").click();

    cy.contains("Dog updated successfully.").should("be.visible");
    cy.contains("Role: Search and Rescue").should("be.visible");
    cy.contains("Call sign: Bug Slayer").should("be.visible");
    cy.contains("Notes: Updated automatically by Cypress.").should(
      "be.visible"
    );
  });

  // TEST #8 — Logged-in user can delete a Working Dog
  it("allows a logged-in user to delete a Working Dog", () => {
    cy.visit("http://localhost:5173/login");

    cy.env(["testEmail", "testPassword"]).then(
      ({ testEmail, testPassword }) => {
        cy.get('input[name="email"]').type(testEmail);
        cy.get('input[name="password"]').type(testPassword);
      }
    );

    cy.get('button[type="submit"]').click();

    cy.get('input[name="name"]').type("Cypress Delete");
    cy.get('input[name="breed"]').type("Labrador Retriever");
    cy.get('input[name="role"]').type("Detection");
    cy.get('select[name="gender"]').select("Female");
    cy.get('input[name="age"]').type("6");
    cy.get('input[name="call_sign"]').type("Delete Dog");

    cy.contains("button", "Add Dog").click();

    cy.contains("a", "Cypress Delete").click();

    cy.contains("button", "Delete Dog").click();

    cy.url().should("include", "/dogs");

    cy.contains("h1", "Working Dogs").should("be.visible");

    cy.contains("a", "Cypress Delete").should("not.exist");
  });
});

});