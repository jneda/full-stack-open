const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const Blog = require("../models/blog");
const helper = require("./testHelper");

const api = supertest(app);
const baseUrl = "/api/blogs";

beforeAll(async () => {
  await Blog.deleteMany();

  for (const blog of helper.initialBlogs) {
    const blogDoc = new Blog(blog);
    await blogDoc.save();
  }
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
  });

  test("it should respond with status code 400 when url is missing", async () => {
    const newBlog = {
      title: "Fish are okay",
      author: "Madeleine Sévère",
    };

    await api.post(baseUrl).send(newBlog).expect(400);
  });
});

afterAll(async () => {
  await mongoose.connection.close();
});
