describe("Note app", () => {
  beforeEach(function () {
    cy.request("POST", "http://localhost:3001/api/testing/reset");
    const user = {
      name: "Jean-Luc Sakamoto",
      username: "jlsaka",
      password: "sakamoto",
    };
    cy.request("POST", "http://localhost:3001/api/users", user);

    cy.visit("http://localhost:5173");
  });

  it("front page can be opened", function () {
    cy.contains("Notes");
    cy.contains("Note app, SeaPines 2023");
  });

  it("user can log in", function () {
    cy.contains("Log in").click();
    cy.get("#username").type("jlsaka");
    cy.get("#password").type("sakamoto");
    cy.get("#login-button").click();

    cy.contains(" logged in");
  });

  describe("when logged in", function () {
    beforeEach(function () {
      cy.contains("Log in").click();
      cy.get("#username").type("jlsaka");
      cy.get("#password").type("sakamoto");
      cy.get("#login-button").click();
    });

    it("a new note can be created", function () {
      cy.contains("Add note").click();
      cy.get("#new-note").type("A note created by Cypress");
      cy.contains("Save").click();

      cy.contains("A note created by Cypress");
    });

    describe("and a note exists", () => {
      beforeEach(function () {
        cy.contains("Add note").click();
        cy.get("#new-note").type("Another note created by Cypress");
        cy.contains("Save").click();
      });

      it("it can be made not important", function () {
        cy.contains("Another note created by Cypress")
          .contains("make not important")
          .click();

        cy.contains("Another note created by Cypress").contains(
          "make important"
        );
      });
    });
  });
});
