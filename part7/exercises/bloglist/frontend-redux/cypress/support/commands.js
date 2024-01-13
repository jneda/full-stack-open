// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************

Cypress.Commands.add("login", ({ username, password }) => {
  cy.request("POST", `${Cypress.env("BACKEND")}/login`, {
    username,
    password,
  }).then(({ body }) => {
    localStorage.setItem("loggedBlogappUser", JSON.stringify(body));
  });
});

Cypress.Commands.add("createBlog", ({ title, author, url }) => {
  const token = JSON.parse(localStorage.getItem("loggedBlogappUser")).token;
  console.log(token);
  cy.request({
    method: "POST",
    url: `${Cypress.env("BACKEND")}/blogs`,
    body: { title, author, url },
    headers: { Authorization: `Bearer ${token}` },
  });
});

Cypress.Commands.add("createUser", ({ username, name, password }) => {
  cy.request("POST", `${Cypress.env("BACKEND")}/users`, {
    username,
    name,
    password,
  });
});
