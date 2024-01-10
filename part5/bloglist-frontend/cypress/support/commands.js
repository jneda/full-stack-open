// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************

Cypress.Commands.add("login", ({ username, password }) => {
  cy.request("POST", "http://localhost:3003/api/login", {
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
    url: "http://localhost:3003/api/blogs",
    body: { title, author, url },
    headers: { Authorization: `Bearer ${token}` },
  });
});
