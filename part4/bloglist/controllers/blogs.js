const jwt = require("jsonwebtoken");
const blogsRouter = require("express").Router();
const Blog = require("../models/blog");
const User = require("../models/user");

blogsRouter.get("/", async (request, response) => {
  const blogs = await Blog.find({}).populate("user", { username: 1, name: 1 });
  response.json(blogs);
});

blogsRouter.post("/", async (request, response) => {
  const body = request.body;

  const decodedToken = await jwt.verify(request.token, process.env.SECRET);
  if (!decodedToken.id) {
    return response.status(401).json({ error: "Invalid token." });
  }

  const user = await User.findById(decodedToken.id);

  if (!user) {
    throw new Error("Failed to fetch user.");
  }

  const newBlog = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes || 0,
    user: user._id.toString(),
  };

  const blogDocument = new Blog(newBlog);

  const createdBlog = await blogDocument.save();

  user.blogs = user.blogs.concat(createdBlog.id);
  await user.save();

  response.status(201).json(createdBlog);
});

blogsRouter.put("/:id", async (request, response) => {
  const update = request.body;

  const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, update, {
    new: true,
    runValidators: true,
    context: "query",
  });

  if (!updatedBlog) {
    throw new Error("Resource not found.");
  }

  response.json(updatedBlog);
});

blogsRouter.delete("/:id", async (request, response) => {
  const result = await Blog.findByIdAndDelete(request.params.id);

  if (!result) {
    throw new Error("Resource not found.");
  }

  response.status(204).end();
});

module.exports = blogsRouter;
