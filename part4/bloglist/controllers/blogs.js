const blogsRouter = require("express").Router();
const Blog = require("../models/blog");

blogsRouter.get("/api/blogs", async (request, response) => {
  const blogs = await Blog.find({});
  response.json(blogs);
});

blogsRouter.post("/api/blogs", async (request, response) => {
  const body = request.body;

  const newBlog = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes || 0,
  };

  const blogDocument = new Blog(newBlog);

  const createdBlog = await blogDocument.save();
  response.status(201).json(createdBlog);
});

blogsRouter.put("/api/blogs/:id", async (request, response) => {
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

blogsRouter.delete("/api/blogs/:id", async (request, response) => {
  const result = await Blog.findByIdAndDelete(request.params.id);

  if (!result) {
    throw new Error("Resource not found.");
  }

  response.status(204).end();
});

module.exports = blogsRouter;
