const blogsRouter = require("express").Router();
const middleware = require("../utils/middleware");
const Blog = require("../models/blog");

blogsRouter.get("/", async (request, response) => {
  const blogs = await Blog.find({})
    .populate("user", { username: 1, name: 1 })
    .populate("comments", { content: 1 });
  response.json(blogs);
});

blogsRouter.use(middleware.tokenExtractor, middleware.userExtractor);

blogsRouter.post("/", async (request, response) => {
  const body = request.body;

  const user = request.user;

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

  await createdBlog.populate("user", { username: 1, name: 1 });
  response.status(201).json(createdBlog);
});

blogsRouter.put("/:id", async (request, response) => {
  const blogToUpdate = await Blog.findById(request.params.id);

  if (!blogToUpdate) {
    throw new Error("Resource not found.");
  }

  const update = request.body;

  const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, update, {
    new: true,
    runValidators: true,
    context: "query",
  });

  if (!updatedBlog) {
    throw new Error("Resource not found.");
  }

  await updatedBlog.populate([
    {
      path: "user",
      select: { username: 1, name: 1 },
    },
    { path: "comments", select: { content: 1 } },
  ]);

  response.json(updatedBlog);
});

blogsRouter.delete("/:id", async (request, response) => {
  const user = request.user;

  const blogToDelete = await Blog.findById(request.params.id);

  if (!blogToDelete) {
    throw new Error("Resource not found.");
  }

  if (user.id !== blogToDelete.user.toString()) {
    return response.status(403).json({ error: "You are forbidden." });
  }

  const deletedBlog = await Blog.findByIdAndDelete(request.params.id);

  response.status(200).json(deletedBlog);
});

module.exports = blogsRouter;
