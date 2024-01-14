describe("Blog app", function () {
  beforeEach(function () {
    cy.request("POST", `${Cypress.env("BACKEND")}/testing/reset`);

    const user = {
      username: "serj",
      name: "Serge Han-Ris",
      password: "123",
    };

    cy.createUser(user);
  });

  it("Login form is shown", function () {
    cy.visit("/");
    cy.get("[data-cy='login-form']");
  });

  describe("Login", function () {
    it("Succeeds with correct credentials", function () {
      cy.visit("/");
      cy.get("[data-cy='username-input']").type("serj");
      cy.get("[data-cy='password-input']").type("123");
      cy.get("[data-cy='login-submit']").click();

      cy.contains("Serge Han-Ris logged in");
    });

    it("Fails with wrong credentials", function () {
      cy.visit("/");
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
      cy.visit("/");
      cy.get("[data-cy='show-togglable-btn']").click();

      cy.get("[data-cy='title-input']").type("Doggoes doggoes");
      cy.get("[data-cy='author-input']").type("Jean-Luc Sakamoto");
      cy.get("[data-cy='url-input']").type("http://woofwoof.com");
      cy.get("[data-cy='blog-form-submit']").click();

      cy.get("[data-cy='blog-item']")
        .should("have.length", 1)
        .should("contain", "Doggoes doggoes - Jean-Luc Sakamoto");
    });

    describe("And a blog exists", function () {
      beforeEach(function () {
        cy.createBlog({
          title: "Doggoes doggoes",
          author: "Jean-Luc Sakamoto",
          url: "http://woofwoof.org",
        });
      });

      it("A blog can be liked", function () {
        cy.visit("/");
        cy.get("a").contains("Doggoes doggoes").click();
        cy.get("[data-cy='blog-like-btn']").click();

        cy.get("[data-cy='blog-likes']").should("contain", "1 like");
      });

      it("A blog can be deleted by its user", function () {
        cy.visit("/");
        cy.get("a").contains("Doggoes doggoes").click();
        cy.get("[data-cy='delete-blog-btn']").click();

        cy.get("[data-cy='blog-item']").should("have.length", 0);
        cy.get("html").should("not.contain", "[data-cy='blog-item']");
      });

      it("Only the user that added a blog can see the Delete button", function () {
        const user = {
          username: "jlsaka",
          name: "Jean-Luc Sakamoto",
          password: "456",
        };

        cy.createUser(user);
        cy.login({ username: user.username, password: user.password });

        cy.visit("/");
        cy.get("a").contains("Doggoes doggoes").click();
        cy.get("[data-cy='blog-details']").should(
          "not.contain",
          "[data-cy='delete-blog-btn']",
        );
      });
    });

    describe("And several blogs exist", function () {
      beforeEach(function () {
        cy.createBlog({
          title: "Doggoes doggoes",
          author: "Jean-Luc Sakamoto",
          url: "http://woofwoof.org",
        });
        cy.createBlog({
          title: "Sneaky mice",
          author: "Romarine Smith",
          url: "ninjamice.ru",
        });

        cy.visit("/");
      });

      it.only("Blogs are ordered in descending likes order", function () {
        cy.get("a").contains("Sneaky mice").click();

        cy.get("[data-cy='blog-like-btn']").click();

        cy.get("[data-cy='blog-likes']").should("contain", "1 like");

        cy.get("[data-cy='home-link']").click();

        cy.get("[data-cy='blog-item']").eq(0).should("contain", "Sneaky mice");

        cy.get("a").contains("Doggoes doggoes").click();

        cy.get("[data-cy='blog-like-btn']").click();

        cy.get("[data-cy='blog-likes']").should("contain", "1 like");

        cy.get("[data-cy='blog-like-btn']").click();

        cy.get("[data-cy='blog-likes']").should("contain", "2 likes");

        cy.get("[data-cy='home-link']").click();

        cy.get("[data-cy='blog-item']")
          .eq(0)
          .should("contain", "Doggoes doggoes");
      });
    });
  });
});
