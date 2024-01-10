describe("Blog app", function () {
  beforeEach(function () {
    cy.request("POST", "http://localhost:3003/api/testing/reset");

    const user = {
      username: "serj",
      name: "Serge Han-Ris",
      password: "123",
    };

    cy.request("POST", "http://localhost:3003/api/users", user);

    cy.visit("http://localhost:5173");
  });

  it("Login form is shown", function () {
    cy.get("[data-cy='login-form']");
  });

  describe("Login", function () {
    it("Succeeds with correct credentials", function () {
      cy.get("[data-cy='username-input']").type("serj");
      cy.get("[data-cy='password-input']").type("123");
      cy.get("[data-cy='login-submit']").click();

      cy.contains("Serge Han-Ris logged in");
    });

    it("Fails with wrong credentials", function () {
      cy.get("[data-cy='username-input']").type("serj");
      cy.get("[data-cy='password-input']").type("456");
      cy.get("[data-cy='login-submit']").click();

      cy.get("[data-cy='notification']")
        .should("contain", "Invalid username or password.")
        .and("have.css", "color", "rgb(221, 68, 68)");
    });
  });

  describe("When logged in", function () {
    beforeEach(function () {
      cy.login({ username: "serj", password: "123" });
    });

    it("A blog can be created", function () {
      cy.visit("http://localhost:5173");
      cy.get("[data-cy='show-togglable-btn']").click();

      cy.get("[data-cy='title-input']").type("Doggoes doggoes");
      cy.get("[data-cy='author-input']").type("Jean-Luc Sakamoto");
      cy.get("[data-cy='url-input']").type("http://woofwoof.com");
      cy.get("[data-cy='blog-form-submit']").click();

      cy.get("[data-cy='blog-item']")
        .should("have.length", 1)
        .should("contain", "Doggoes doggoes - Jean-Luc Sakamoto");
    });

    it.only("A blog can be liked", function () {
      cy.createBlog({
        title: "Doggoes doggoes",
        author: "Jean-Luc Sakamoto",
        url: "http://woofwoof.org",
      });
      cy.visit("http://localhost:5173");

      cy.get("[data-cy='blog-details-toggle-btn']").click();
      cy.get("[data-cy='blog-like-btn']").click();

      cy.get("[data-cy='blog-likes']").should("contain", "Likes: 1");
    });
  });
});
