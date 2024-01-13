const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
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
  let user;
  let token;

  beforeEach(async () => {
    await User.deleteMany({});
    const passwordHash = await bcrypt.hash("secret", 10);
    user = new User({ username: "root", passwordHash });
    await user.save();

    const userForToken = {
      username: user.username,
      id: user._id,
    };

    token = jwt.sign(userForToken, process.env.SECRET, {
      expiresIn: 60 * 60,
    });
  });

  test("it should create a new blog on sending a POST request", async () => {
    const newBlog = {
      title: "Fish are okay",
      author: "Madeleine Sévère",
      url: "https://www.gloubgloub.tv",
      likes: 9,
    };

    await api
      .post(baseUrl)
      .set("Authorization", `Bearer ${token}`)
      .send(newBlog)
      .expect(201)
      .expect("Content-Type", /application\/json/);

    const blogsInDb = await helper.blogsInDb();

    expect(blogsInDb.length).toBe(helper.initialBlogs.length + 1);

    const contents = blogsInDb.map((b) => {
      delete b.id;
      return b;
    });

    const newBlogWithUser = {
      ...newBlog,
      user: user._id,
    };

    expect(contents).toContainEqual(newBlogWithUser);
  });

  test("it should fail with status code 401 if a valid token is not provided", async () => {
    const blogsAtStart = await helper.blogsInDb();

    const newBlog = {
      title: "Fish are okay",
      author: "Madeleine Sévère",
      url: "https://www.gloubgloub.tv",
      likes: 9,
    };

    await api.post(baseUrl).send(newBlog).expect(401);

    const blogsAtEnd = await helper.blogsInDb();

    expect(blogsAtEnd).toHaveLength(blogsAtStart.length);
  });
});

describe("on sending a new blog without the likes property", () => {
  let user;
  let token;

  beforeEach(async () => {
    await User.deleteMany({});
    const passwordHash = await bcrypt.hash("secret", 10);
    user = new User({ username: "root", passwordHash });
    await user.save();

    const userForToken = {
      username: user.username,
      id: user._id,
    };

    token = jwt.sign(userForToken, process.env.SECRET, {
      expiresIn: 60 * 60,
    });
  });

  test("it should create the blog and give the likes property a default value of 0", async () => {
    const newBlog = {
      title: "Fish are okay",
      author: "Madeleine Sévère",
      url: "https://www.gloubgloub.tv",
    };

    const response = await api
      .post(baseUrl)
      .set("Authorization", `Bearer ${token}`)
      .send(newBlog)
      .expect(201)
      .expect("Content-Type", /application\/json/);

    const createdBlog = response.body;

    expect(createdBlog.likes).toBe(0);
  });
});

describe("on sending incomplete data when creating a blog", () => {
  let user;
  let token;

  beforeEach(async () => {
    await User.deleteMany({});
    const passwordHash = await bcrypt.hash("secret", 10);
    user = new User({ username: "root", passwordHash });
    await user.save();

    const userForToken = {
      username: user.username,
      id: user._id,
    };

    token = jwt.sign(userForToken, process.env.SECRET, {
      expiresIn: 60 * 60,
    });
  });

  test("it should respond with status code 400 when title is missing", async () => {
    const newBlog = {
      author: "Madeleine Sévère",
      url: "https://www.gloubgloub.tv",
    };

    await api
      .post(baseUrl)
      .set("Authorization", `Bearer ${token}`)
      .send(newBlog)
      .expect(400);

    const notesAtEnd = await helper.blogsInDb();
    expect(notesAtEnd.length).toBe(helper.initialBlogs.length);
  });

  test("it should respond with status code 400 when url is missing", async () => {
    const newBlog = {
      title: "Fish are okay",
      author: "Madeleine Sévère",
    };

    await api
      .post(baseUrl)
      .set("Authorization", `Bearer ${token}`)
      .send(newBlog)
      .expect(400);

    const notesAtEnd = await helper.blogsInDb();
    expect(notesAtEnd.length).toBe(helper.initialBlogs.length);
  });
});

describe("deleting a blog", () => {
  let user;
  let token;

  beforeEach(async () => {
    await User.deleteMany({});
    const passwordHash = await bcrypt.hash("secret", 10);
    user = new User({ username: "root", passwordHash });
    await user.save();

    const userForToken = {
      username: user.username,
      id: user._id,
    };

    token = jwt.sign(userForToken, process.env.SECRET, {
      expiresIn: 60 * 60,
    });
  });

  test("should succeed with status code 200 and send back the deleted blog when providing a valid id", async () => {
    const blogsAtStart = await helper.blogsInDb();

    const blogToDelete = blogsAtStart[0];
    await Blog.findByIdAndUpdate(blogToDelete.id, {
      user: user._id,
    });

    const response = await api
      .delete(`${baseUrl}/${blogToDelete.id}`)
      .set("Authorization", `Bearer ${token}`)
      .expect(200)
      .expect("Content-Type", /application\/json/);

    const deletedBlog = response.body;
    delete deletedBlog.user;

    expect(deletedBlog).toEqual(blogToDelete);

    const blogsAtEnd = await helper.blogsInDb();

    expect(blogsAtEnd.length).toBe(blogsAtStart.length - 1);

    expect(blogsAtEnd).not.toContainEqual(blogToDelete);
  });

  test("it should fail with status code 401 if a valid token is not provided", async () => {
    const blogsAtStart = await helper.blogsInDb();

    const blogToDelete = blogsAtStart[0];
    await Blog.findByIdAndUpdate(blogToDelete.id, {
      user: user._id,
    });

    await api.delete(`${baseUrl}/${blogToDelete.id}`).expect(401);

    const blogsAtEnd = await helper.blogsInDb();

    expect(blogsAtEnd).toHaveLength(blogsAtStart.length);
  });

  test("it should fail with status code 403 if the user is not the owner", async () => {
    const blogsAtStart = await helper.blogsInDb();

    const blogToDelete = blogsAtStart[0];
    await Blog.findByIdAndUpdate(blogToDelete.id, {
      user: user._id,
    });

    const passwordHash = await bcrypt.hash("badsecret", 10);

    const otherUser = new User({ username: "bad", passwordHash });
    await otherUser.save();

    const otherUserForToken = {
      username: otherUser.username,
      id: otherUser._id,
    };

    const otherToken = jwt.sign(otherUserForToken, process.env.SECRET, {
      expiresIn: 60 * 60,
    });

    await api
      .delete(`${baseUrl}/${blogToDelete.id}`)
      .set("Authorization", `Bearer ${otherToken}`)
      .expect(403);

    const blogsAtEnd = await helper.blogsInDb();

    expect(blogsAtEnd).toHaveLength(blogsAtStart.length);
  });

  test("should fail with status code 404 if blog does not exist", async () => {
    const blogsAtStart = await helper.blogsInDb();

    const validNonExistingId = await helper.nonExistingId();

    await api
      .delete(`/api/blogs/${validNonExistingId}`)
      .set("Authorization", `Bearer ${token}`)
      .expect(404);

    const blogsAtEnd = await helper.blogsInDb();

    expect(blogsAtEnd).toHaveLength(blogsAtStart.length);
  });

  test("should fail with status code 400 if id is invalid", async () => {
    const blogsAtStart = await helper.blogsInDb();

    const invalidId = "thisisnotavalidid";

    await api
      .delete(`/api/blogs/${invalidId}`)
      .set("Authorization", `Bearer ${token}`)
      .expect(400);

    const blogsAtEnd = await helper.blogsInDb();

    expect(blogsAtEnd).toHaveLength(blogsAtStart.length);
  });
});

describe("updating a blog", () => {
  let user;
  let token;

  beforeEach(async () => {
    await User.deleteMany({});
    const passwordHash = await bcrypt.hash("secret", 10);
    user = new User({ username: "root", passwordHash });
    await user.save();

    const userForToken = {
      username: user.username,
      id: user._id,
    };

    token = jwt.sign(userForToken, process.env.SECRET, {
      expiresIn: 60 * 60,
    });
  });

  test("should succeed when providing valid id and update data", async () => {
    const blogsAtStart = await helper.blogsInDb();

    const blogToUpdate = blogsAtStart[0];
    await Blog.findByIdAndUpdate(blogToUpdate.id, {
      user: user._id,
    });

    const update = {
      ...blogToUpdate,
      likes: 42,
    };

    const response = await api
      .put(`${baseUrl}/${blogToUpdate.id}`)
      .set("Authorization", `Bearer ${token}`)
      .send(update)
      .expect(200)
      .expect("Content-Type", /application\/json/);

    const updatedBlog = response.body;

    expect(updatedBlog.likes).toBe(42);

    const blogsAtEnd = await helper.blogsInDb();

    const updateWithUser = {
      ...update,
      user: user._id,
    };

    expect(blogsAtEnd).toContainEqual(updateWithUser);
  });

  test("should fail with status 401 when no token is provided", async () => {
    const blogsAtStart = await helper.blogsInDb();

    const blogToUpdate = blogsAtStart[0];
    await Blog.findByIdAndUpdate(blogToUpdate.id, {
      user: user._id,
    });

    const update = {
      ...blogToUpdate,
      likes: 42,
    };

    await api
      .put(`${baseUrl}/${blogToUpdate.id}`)
      .send(update)
      .expect(401)
      .expect("Content-Type", /application\/json/);

    const blogsAtEnd = await helper.blogsInDb();

    const blogWithUser = {
      ...blogToUpdate,
      user: user._id,
    };

    expect(blogsAtEnd).toContainEqual(blogWithUser);
  });

  // test("should fail with status code 403 when the user is not the owner", async () => {
  //   const blogsAtStart = await helper.blogsInDb();

  //   const blogToUpdate = blogsAtStart[0];
  //   await Blog.findByIdAndUpdate(blogToUpdate.id, {
  //     user: user._id,
  //   });

  //   const update = {
  //     ...blogToUpdate,
  //     likes: 42,
  //   };

  //   const passwordHash = await bcrypt.hash("badsecret", 10);

  //   const otherUser = new User({ username: "bad", passwordHash });
  //   await otherUser.save();

  //   const otherUserForToken = {
  //     username: otherUser.username,
  //     id: otherUser._id,
  //   };

  //   const otherToken = jwt.sign(otherUserForToken, process.env.SECRET, {
  //     expiresIn: 60 * 60,
  //   });

  //   await api
  //     .put(`${baseUrl}/${blogToUpdate.id}`)
  //     .set("Authorization", `Bearer ${otherToken}`)
  //     .send(update)
  //     .expect(403);

  //   const blogsAtEnd = await helper.blogsInDb();

  //   const blogWithUser = {
  //     ...blogToUpdate,
  //     user: user._id,
  //   };

  //   expect(blogsAtEnd).toContainEqual(blogWithUser);
  // });

  test("should fail with status code 404 when providing a valid but non existing id", async () => {
    const nonExistingId = await helper.nonExistingId();

    const blogsAtStart = await helper.blogsInDb();

    const blogToUpdate = blogsAtStart[0];
    const update = {
      ...blogToUpdate,
      likes: 42,
    };

    await api
      .put(`${baseUrl}/${nonExistingId}`)
      .set("Authorization", `Bearer ${token}`)
      .send(update)
      .expect(404);
  });

  test("should fail with status code 400 when providing an invalid id", async () => {
    const invalidId = "thisisdefinitelynotvalid";

    const blogsAtStart = await helper.blogsInDb();

    const blogToUpdate = blogsAtStart[0];
    const update = {
      ...blogToUpdate,
      likes: 42,
    };

    await api
      .put(`${baseUrl}/${invalidId}`)
      .set("Authorization", `Bearer ${token}`)
      .send(update)
      .expect(400);
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
