describe("Note app", () => {
  beforeEach(function () {
    cy.request("POST", `${Cypress.env("BACKEND")}/testing/reset`);
    const user = {
      name: "Jean-Luc Sakamoto",
      username: "jlsaka",
      password: "sakamoto",
    };
    cy.request("POST", `${Cypress.env("BACKEND")}/users`, user);

    cy.visit("");
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

    cy.contains("Jean-Luc Sakamoto logged in");
  });

  describe("when logged in", function () {
    beforeEach(function () {
      cy.login({
        username: "jlsaka",
        password: "sakamoto",
      });
    });

    it("a new note can be created", function () {
      cy.createNote({
        content: "A note created by Cypress",
        important: true,
      });

      cy.contains("A note created by Cypress");
    });

    describe("and a note exists", () => {
      beforeEach(function () {
        cy.createNote({
          content: "Another note created by Cypress",
          important: true,
        });
      });

      it("it can be made not important", function () {
        cy.contains("Another note created by Cypress")
          .parent()
          .find("button")
          .as("theButton");
        cy.get("@theButton").click();

        cy.get("@theButton").contains("make important");
      });
    });

    describe("and several notes exist", () => {
      beforeEach(function () {
        cy.login({ username: "jlsaka", password: "sakamoto" });
        cy.createNote({ content: "First note", important: false });
        cy.createNote({ content: "Second note", important: false });
        cy.createNote({ content: "Third note", important: false });
      });

      it("one of those can be made important", function () {
        cy.contains("Second note").parent().find("button").as("theButton");
        cy.get("@theButton").click();
        cy.get("@theButton").should("contain", "make not important");
      });
    });
  });

  it("login fails with wrong password", function () {
    cy.contains("Log in").click();
    cy.get("#username").type("jlsaka");
    cy.get("#password").type("wrong");
    cy.get("#login-button").click();

    cy.get(".error")
      .should("contain", "Wrong credentials.")
      .and("have.css", "color", "rgb(255, 0, 0)")
      .and("have.css", "border-style", "solid");

    cy.get("html").should("not.contain", "Jean-Luc Sakamoto logged in");
  });
});
