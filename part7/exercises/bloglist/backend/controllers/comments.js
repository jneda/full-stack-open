const commentsRouter = require("express").Router();
const Comment = require("../models/comment");
const Blog = require("../models/blog");

commentsRouter.get("/", async (request, response) => {
  const comments = await Comment.find({});
  response.json(comments);
});

commentsRouter.post("/", async (request, response) => {
  const { content, blog } = request.body;

  const comment = new Comment({ content, blog });
  const createdComment = await comment.save();

  const blogDocument = await Blog.findById(blog);
  blogDocument.comments.push(createdComment.id);
  await blogDocument.save();

  response.status(201).json(createdComment);
});

module.exports = commentsRouter;
