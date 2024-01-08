const bcrypt = require("bcrypt");
const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const Blog = require("../models/blog");
const User = require("../models/user");
const helper = require("./testHelper");

const api = supertest(app);
const baseUrl = "/api/blogs";

beforeEach(async () => {
  await Blog.deleteMany();
  await Blog.insertMany(helper.initialBlogs);
});

describe("get all blogs", () => {
  test("it should return the correct number of blogs in the JSON format", async () => {
    const response = await api
      .get(baseUrl)
      .expect(200)
      .expect("Content-Type", /application\/json/);

    const blogs = response.body;
    expect(blogs.length).toBe(helper.initialBlogs.length);
  });
});

describe("unique identifier property of a blog", () => {
  test("it should be id", async () => {
    const response = await api.get(baseUrl);

    const blogs = response.body;

    expect(blogs[0].id).toBeDefined();
  });
});

describe("create a blog", () => {
  test("it should create a new blog on sending a POST request", async () => {
    const newBlog = {
      title: "Fish are okay",
      author: "Madeleine Sévère",
      url: "https://www.gloubgloub.tv",
      likes: 9,
    };

    await api
      .post(baseUrl)
      .send(newBlog)
      .expect(201)
      .expect("Content-Type", /application\/json/);

    const blogsInDb = await helper.blogsInDb();

    expect(blogsInDb.length).toBe(helper.initialBlogs.length + 1);

    const contents = blogsInDb.map((b) => {
      delete b.id;
      return b;
    });

    expect(contents).toContainEqual(newBlog);
  });
});

describe("on sending a new blog without the likes property", () => {
  test("it should create the blog and give the likes property a default value of 0", async () => {
    const newBlog = {
      title: "Fish are okay",
      author: "Madeleine Sévère",
      url: "https://www.gloubgloub.tv",
    };

    const response = await api
      .post(baseUrl)
      .send(newBlog)
      .expect(201)
      .expect("Content-Type", /application\/json/);

    const createdBlog = response.body;

    expect(createdBlog.likes).toBe(0);
  });
});

describe("on sending incomplete data when creating a blog", () => {
  test("it should respond with status code 400 when title is missing", async () => {
    const newBlog = {
      author: "Madeleine Sévère",
      url: "https://www.gloubgloub.tv",
    };

    await api.post(baseUrl).send(newBlog).expect(400);

    const notesAtEnd = await helper.blogsInDb();
    expect(notesAtEnd.length).toBe(helper.initialBlogs.length);
  });

  test("it should respond with status code 400 when url is missing", async () => {
    const newBlog = {
      title: "Fish are okay",
      author: "Madeleine Sévère",
    };

    await api.post(baseUrl).send(newBlog).expect(400);

    const notesAtEnd = await helper.blogsInDb();
    expect(notesAtEnd.length).toBe(helper.initialBlogs.length);
  });
});

describe("deleting a note", () => {
  test("should succeed with status code 204 when providing a valid id", async () => {
    const blogsAtStart = await helper.blogsInDb();

    const blogToDelete = blogsAtStart[0];

    await api.delete(`${baseUrl}/${blogToDelete.id}`).expect(204);

    const blogsAtEnd = await helper.blogsInDb();

    expect(blogsAtEnd.length).toBe(blogsAtStart.length - 1);

    expect(blogsAtEnd).not.toContainEqual(blogToDelete);
  });

  test("should fail with status code 404 if note does not exist", async () => {
    const validNonExistingId = await helper.nonExistingId();

    await api.delete(`/api/blogs/${validNonExistingId}`).expect(404);
  });

  test("should fail with status code 400 if id is invalid", async () => {
    const invalidId = "thisisnotavalidid";

    await api.delete(`/api/blogs/${invalidId}`).expect(400);
  });
});

describe("updating a note", () => {
  test("should succeed when providing valid id and update data", async () => {
    const blogsAtStart = await helper.blogsInDb();

    const blogToUpdate = blogsAtStart[0];
    const update = {
      ...blogToUpdate,
      likes: 42,
    };

    const response = await api
      .put(`${baseUrl}/${blogToUpdate.id}`)
      .send(update)
      .expect(200)
      .expect("Content-Type", /application\/json/);

    const updatedBlog = response.body;

    expect(updatedBlog.likes).toBe(42);

    const blogsAtEnd = await helper.blogsInDb();

    expect(blogsAtEnd).toContainEqual(update);
  });

  test("should fail with status code 404 when providing a valid but non existing id", async () => {
    const nonExistingId = await helper.nonExistingId();

    const blogsAtStart = await helper.blogsInDb();

    const blogToUpdate = blogsAtStart[0];
    const update = {
      ...blogToUpdate,
      likes: 42,
    };

    await api.put(`${baseUrl}/${nonExistingId}`).send(update).expect(404);
  });

  test("should fail with status code 400 when providing an invalid id", async () => {
    const invalidId = "thisisdefinitelynotvalid";

    const blogsAtStart = await helper.blogsInDb();

    const blogToUpdate = blogsAtStart[0];
    const update = {
      ...blogToUpdate,
      likes: 42,
    };

    await api.put(`${baseUrl}/${invalidId}`).send(update).expect(400);
  });
});

describe("when there is initially one user in db", () => {
  beforeEach(async () => {
    await User.deleteMany({});

    const passwordHash = await bcrypt.hash("password", 10);
    const user = new User({ username: "root", passwordHash });
    await user.save();
  });

  test("get all users returns the correct users", async () => {
    const usersAtStart = await helper.usersInDb();

    const response = await api
      .get("/api/users")
      .expect(200)
      .expect("Content-Type", /application\/json/);

    expect(response.body).toEqual(usersAtStart);
  });

  test("creation succeeds with a fresh username", async () => {
    const usersAtStart = await helper.usersInDb();

    const newUser = {
      username: "jlsaka",
      name: "Jean-Luc Sakamoto",
      password: "sakamoto",
    };

    await api
      .post("/api/users")
      .send(newUser)
      .expect(201)
      .expect("Content-Type", /application\/json/);

    const usersAtEnd = await helper.usersInDb();
    expect(usersAtEnd).toHaveLength(usersAtStart.length + 1);

    const usernames = usersAtEnd.map((u) => u.username);
    expect(usernames).toContain(newUser.username);
  });

  test("creation fails when username or password are omitted", async () => {
    const usersAtStart = await helper.usersInDb();

    const newUser = {
      username: "jlsaka",
      name: "Jean-Luc Sakamoto",
      password: "sakamoto",
    };

    const noUsername = { ...newUser };
    delete noUsername.username;

    const noPassword = { ...newUser };
    delete noPassword.password;

    let response = await api
      .post("/api/users")
      .send(noUsername)
      .expect(400)
      .expect("Content-Type", /application\/json/);

    expect(response.body.error).toBe(
      "Invalid username or password: 3 characters minimum."
    );

    let usersAtEnd = await helper.usersInDb();
    expect(usersAtEnd).toHaveLength(usersAtStart.length);

    response = await api
      .post("/api/users")
      .send(noPassword)
      .expect(400)
      .expect("Content-Type", /application\/json/);

    expect(response.body.error).toBe(
      "Invalid username or password: 3 characters minimum."
    );

    usersAtEnd = await helper.usersInDb();
    expect(usersAtEnd).toHaveLength(usersAtStart.length);
  });

  test("creation fails when username or password are too short", async () => {
    const usersAtStart = await helper.usersInDb();

    const newUser = {
      username: "jlsaka",
      name: "Jean-Luc Sakamoto",
      password: "sakamoto",
    };

    const badUsername = { ...newUser, username: "ju" };

    const badPassword = { ...newUser, password: "gg" };

    let response = await api
      .post("/api/users")
      .send(badUsername)
      .expect(400)
      .expect("Content-Type", /application\/json/);

    expect(response.body.error).toBe(
      "Invalid username or password: 3 characters minimum."
    );

    let usersAtEnd = await helper.usersInDb();
    expect(usersAtEnd).toHaveLength(usersAtStart.length);

    response = await api
      .post("/api/users")
      .send(badPassword)
      .expect(400)
      .expect("Content-Type", /application\/json/);

    expect(response.body.error).toBe(
      "Invalid username or password: 3 characters minimum."
    );

    usersAtEnd = await helper.usersInDb();
    expect(usersAtEnd).toHaveLength(usersAtStart.length);
  });

  test("creation fails when username already exists", async () => {
    const usersAtStart = await helper.usersInDb();

    const newUser = {
      username: "root",
      password: "password123",
    };

    const response = await api
      .post("/api/users")
      .send(newUser)
      .expect(409)
      .expect("Content-Type", /application\/json/);

    expect(response.body.error).toBe("Username already exists.");

    const usersAtEnd = await helper.usersInDb();
    expect(usersAtEnd).toHaveLength(usersAtStart.length);
  });
});

afterAll(async () => {
  await mongoose.connection.close();
});
