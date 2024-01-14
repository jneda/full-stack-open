const commentsRouter = require("express").Router();
const Comment = require("../models/comment");

commentsRouter.get("/", async (request, response) => {
  const comments = await Comment.find({});
  response.json(comments);
});

commentsRouter.post("/", async (request, response) => {
  const { content, blog } = request.body;

  const comment = new Comment({ content, blog });
  const createdComment = await comment.save();

  response.status(201).json(createdComment);
});

module.exports = commentsRouter;
