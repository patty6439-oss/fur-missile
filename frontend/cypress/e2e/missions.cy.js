describe("Missions Page", () => {
  // TEST #9 — Logged-in user can view the Missions page
  it("allows a logged-in user to view the Missions page", () => {
    cy.visit("http://localhost:5173/login");

    cy.env(["testEmail", "testPassword"]).then(
      ({ testEmail, testPassword }) => {
        cy.get('input[name="email"]').type(testEmail);
        cy.get('input[name="password"]').type(testPassword);
      }
    );

    cy.get('button[type="submit"]').click();

    cy.url().should("include", "/dogs");

    cy.contains("a", "Missions").click();

    cy.url().should("include", "/missions");

    cy.contains("h1", "Missions").should("be.visible");
    cy.contains("h2", "Create Mission").should("be.visible");
    cy.contains("h2", "Your Missions").should("be.visible");
  });
// TEST #10 — Logged-in user can create a Mission
it("allows a logged-in user to create a Mission", () => {
  cy.visit("http://localhost:5173/login");

  cy.env(["testEmail", "testPassword"]).then(
    ({ testEmail, testPassword }) => {
      cy.get('input[name="email"]').type(testEmail);
      cy.get('input[name="password"]').type(testPassword);
    }
  );

  cy.get('button[type="submit"]').click();

  cy.url().should("include", "/dogs");

  cy.contains("a", "Missions").click();

  cy.url().should("include", "/missions");

  cy.get('input[name="title"]').type("Cypress Create Mission");

  cy.get('input[name="mission_type"]').type("Training");

  cy.get('input[name="location"]').type("Boston, MA");

  cy.get('input[name="mission_date"]').type("2026-08-26");

  cy.get('input[name="mission_time"]').type("14:30");

  cy.get('select[name="status"]').select("Planned");

  cy.get('textarea[name="objective"]').type(
    "Test the Fur Missile mission creation workflow."
  );

  cy.get('textarea[name="notes"]').type(
    "Created automatically by Cypress."
  );

  cy.contains("button", "Create Mission").click();

  cy.contains("a", "Cypress Create Mission").should("be.visible");

  cy.contains("Boston, MA").should("be.visible");

  cy.contains("Date: 2026-08-26").should("be.visible");

  cy.contains("Time: 14:30").should("be.visible");

  cy.contains("planned").should("be.visible");
});
// TEST #11 — Logged-in user can open a Mission detail page
it("allows a logged-in user to open a Mission detail page", () => {
  cy.visit("http://localhost:5173/login");

  cy.env(["testEmail", "testPassword"]).then(
    ({ testEmail, testPassword }) => {
      cy.get('input[name="email"]').type(testEmail);
      cy.get('input[name="password"]').type(testPassword);
    }
  );

  cy.get('button[type="submit"]').click();

  cy.url().should("include", "/dogs");

  cy.contains("a", "Missions").click();

  cy.url().should("include", "/missions");

  cy.get('input[name="title"]').type("Cypress Detail Mission");

  cy.get('input[name="mission_type"]').type("Tracking");

  cy.get('input[name="location"]').type("Cambridge, MA");

  cy.get('input[name="mission_date"]').type("2026-08-27");

  cy.get('input[name="mission_time"]').type("09:15");

  cy.get('select[name="status"]').select("Active");

  cy.get('textarea[name="objective"]').type(
    "Verify the Mission detail page."
  );

  cy.get('textarea[name="notes"]').type(
    "Created for Cypress detail testing."
  );

  cy.contains("button", "Create Mission").click();

  cy.contains("a", "Cypress Detail Mission").click();

  cy.url().should("include", "/missions/");

  cy.contains("h1", "Cypress Detail Mission").should("be.visible");

  cy.contains("Assigned Dog: None").should("be.visible");

  cy.contains("Location: Cambridge, MA").should("be.visible");

  cy.contains("Date: 2026-08-27").should("be.visible");

  cy.contains("Time: 09:15").should("be.visible");

  cy.contains("active").should("be.visible");

  cy.contains("h2", "Mission Badge").should("be.visible");

  cy.contains("No badge generated yet.").should("be.visible");

  cy.contains("button", "Generate Badge").should("be.visible");

  cy.contains("button", "Update Mission").should("be.visible");

  cy.contains("button", "Delete Mission").should("be.visible");
});
// TEST #12 — Logged-in user can update a Mission
it("allows a logged-in user to update a Mission", () => {
  cy.visit("http://localhost:5173/login");

  cy.env(["testEmail", "testPassword"]).then(
    ({ testEmail, testPassword }) => {
      cy.get('input[name="email"]').type(testEmail);
      cy.get('input[name="password"]').type(testPassword);
    }
  );

  cy.get('button[type="submit"]').click();

  cy.url().should("include", "/dogs");

  cy.contains("a", "Missions").click();

  cy.url().should("include", "/missions");

  // Create a mission specifically for this test
  cy.get('input[name="title"]').type("Cypress Update Mission");

  cy.get('input[name="mission_type"]').type("Training");

  cy.get('input[name="location"]').type("Boston, MA");

  cy.get('input[name="mission_date"]').type("2026-08-28");

  cy.get('input[name="mission_time"]').type("10:00");

  cy.get('select[name="status"]').select("Planned");

  cy.get('textarea[name="objective"]').type(
    "Create a mission that Cypress can update."
  );

  cy.get('textarea[name="notes"]').type(
    "Before Cypress update."
  );

  cy.contains("button", "Create Mission").click();

  // Open the mission we just created
  cy.contains("a", "Cypress Update Mission").click();

  cy.url().should("include", "/missions/");

  // Change mission information
  cy.get('input[name="title"]')
    .clear()
    .type("Cypress Updated Mission");

  cy.get('input[name="location"]')
    .clear()
    .type("Quincy, MA");

  cy.get('input[name="mission_time"]')
    .clear()
    .type("15:45");

  cy.get('select[name="status"]').select("Active");

  cy.get('textarea[name="notes"]')
    .clear()
    .type("Updated automatically by Cypress.");

  cy.contains("button", "Update Mission").click();

  // Prove the update succeeded
  cy.contains("Mission updated successfully.").should("be.visible");

  cy.contains("h1", "Cypress Updated Mission").should("be.visible");

  cy.contains("Location: Quincy, MA").should("be.visible");

  cy.contains("Time: 15:45").should("be.visible");

  cy.contains("active").should("be.visible");
});
// TEST #13 — Logged-in user can assign and unassign a Working Dog
it("allows a logged-in user to assign and unassign a Working Dog", () => {
  cy.visit("http://localhost:5173/login");

  cy.env(["testEmail", "testPassword"]).then(
    ({ testEmail, testPassword }) => {
      cy.get('input[name="email"]').type(testEmail);
      cy.get('input[name="password"]').type(testPassword);
    }
  );

  cy.get('button[type="submit"]').click();

  cy.url().should("include", "/dogs");

  // Create a dog specifically for this test
  cy.get('input[name="name"]').type("Cypress Assignment Dog");
  cy.get('input[name="breed"]').type("Belgian Malinois");
  cy.get('input[name="role"]').type("Patrol");
  cy.get('select[name="gender"]').select("Male");
  cy.get('input[name="age"]').type("4");
  cy.get('input[name="call_sign"]').type("Assign Dog");

  cy.contains("button", "Add Dog").click();

  cy.contains("a", "Cypress Assignment Dog").should("be.visible");

  // Go to Missions
  cy.contains("a", "Missions").click();

  cy.url().should("include", "/missions");

  // Create a mission specifically for this test
  cy.get('input[name="title"]').type("Cypress Assignment Mission");
  cy.get('input[name="mission_type"]').type("Training");
  cy.get('input[name="location"]').type("Boston, MA");
  cy.get('input[name="mission_date"]').type("2026-08-29");
  cy.get('input[name="mission_time"]').type("11:30");
  cy.get('select[name="status"]').select("Planned");

  cy.get('textarea[name="objective"]').type(
    "Test assigning and unassigning a Working Dog."
  );

  cy.contains("button", "Create Mission").click();

  // Open the mission
  cy.contains("a", "Cypress Assignment Mission").click();

  cy.url().should("include", "/missions/");

  cy.contains("Assigned Dog: None").should("be.visible");

  // Assign our test dog
  cy.get('select[name="dog"]').select("Cypress Assignment Dog");

  cy.contains("button", "Update Mission").click();

  cy.contains("Mission updated successfully.").should("be.visible");

  cy.contains("Assigned Dog: Cypress Assignment Dog").should(
    "be.visible"
  );

  // Unassign the dog again
  cy.get('select[name="dog"]').select("No dog assigned");

  cy.contains("button", "Update Mission").click();

  cy.contains("Assigned Dog: None").should("be.visible");

  // Return to Dogs and clean up our test dog
  cy.contains("a", "Dogs").click();

  cy.url().should("include", "/dogs");

  cy.contains("a", "Cypress Assignment Dog").click();

  cy.contains("button", "Delete Dog").click();

  cy.url().should("include", "/dogs");

  cy.contains("a", "Cypress Assignment Dog").should("not.exist");
});
// TEST #14 — Logged-in user can delete a Mission
it("allows a logged-in user to delete a Mission", () => {
  cy.visit("http://localhost:5173/login");

  cy.env(["testEmail", "testPassword"]).then(
    ({ testEmail, testPassword }) => {
      cy.get('input[name="email"]').type(testEmail);
      cy.get('input[name="password"]').type(testPassword);
    }
  );

  cy.get('button[type="submit"]').click();

  cy.url().should("include", "/dogs");

  cy.contains("a", "Missions").click();

  cy.url().should("include", "/missions");

  // Create a mission specifically for this test
  cy.get('input[name="title"]').type("Cypress Delete Mission");

  cy.get('input[name="mission_type"]').type("Training");

  cy.get('input[name="location"]').type("Boston, MA");

  cy.get('input[name="mission_date"]').type("2026-08-30");

  cy.get('input[name="mission_time"]').type("13:00");

  cy.get('select[name="status"]').select("Planned");

  cy.get('textarea[name="objective"]').type(
    "Create a mission that Cypress can delete."
  );

  cy.get('textarea[name="notes"]').type(
    "This mission is doomed."
  );

  cy.contains("button", "Create Mission").click();

  // Prove it exists
  cy.contains("a", "Cypress Delete Mission").should("be.visible");

  // Open it
  cy.contains("a", "Cypress Delete Mission").click();

  cy.url().should("include", "/missions/");

  cy.contains("h1", "Cypress Delete Mission").should("be.visible");

  // Delete it
  cy.contains("button", "Delete Mission").click();

  // We should return to the Missions page
  cy.url().should("include", "/missions");

  cy.contains("h1", "Missions").should("be.visible");

  // Prove the mission is actually gone
  cy.contains("a", "Cypress Delete Mission").should("not.exist");
});
// TEST #15 — Badge generation failure shows an error message
it("shows an error message when badge generation fails", () => {
  cy.visit("http://localhost:5173/login");

  cy.env(["testEmail", "testPassword"]).then(
    ({ testEmail, testPassword }) => {
      cy.get('input[name="email"]').type(testEmail);
      cy.get('input[name="password"]').type(testPassword);
    }
  );

  cy.get('button[type="submit"]').click();

  cy.url().should("include", "/dogs");

  cy.contains("a", "Missions").click();

  cy.url().should("include", "/missions");

  // Create a disposable mission for this test
  cy.get('input[name="title"]').type("Cypress Badge Failure Mission");

  cy.get('input[name="mission_type"]').type("Training");

  cy.get('input[name="location"]').type("Boston, MA");

  cy.get('input[name="mission_date"]').type("2026-08-31");

  cy.get('input[name="mission_time"]').type("14:00");

  cy.get('select[name="status"]').select("Planned");

  cy.get('textarea[name="objective"]').type(
    "Test badge generation failure handling."
  );

  cy.contains("button", "Create Mission").click();

  // Open the disposable mission
  cy.contains("a", "Cypress Badge Failure Mission").click();

  cy.url().should("include", "/missions/");

  cy.contains("h1", "Cypress Badge Failure Mission").should(
    "be.visible"
  );

  // Intercept the badge request and deliberately make it fail
  cy.intercept(
    "POST",
    "**/missions/*/badge/",
    {
      statusCode: 500,
      body: {
        detail: "Cypress deliberately broke the badge API.",
      },
    }
  ).as("badgeFailure");

  // Attempt to generate the badge
  cy.contains("button", "Generate Badge").click();

  // Prove our fake failed request happened
  cy.wait("@badgeFailure");

  // Prove Fur Missile handles the failure gracefully
  cy.contains(
    "Badge generation failed. Please try again later."
  ).should("be.visible");

  // The page should still be alive
  cy.contains("h1", "Cypress Badge Failure Mission").should(
    "be.visible"
  );

  // Clean up the disposable mission
  cy.contains("button", "Delete Mission").click();

  cy.url().should("include", "/missions");

  cy.contains("a", "Cypress Badge Failure Mission").should(
    "not.exist"
  );
});

});