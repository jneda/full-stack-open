const jwt = require("jsonwebtoken");
const notesRouter = require("express").Router();
const Note = require("../models/note");
const User = require("../models/user");

notesRouter.get("/", async (request, response) => {
  const notes = await Note.find({}).populate("user", { username: 1, name: 1 });
  response.json(notes);
});

notesRouter.get("/:id", async (request, response) => {
  const note = await Note.findById(request.params.id);
  if (!note) {
    return response.status(404).end();
  }

  response.json(note);
});

const getTokenFrom = (request) => {
  const authorization = request.get("authorization");
  if (authorization && authorization.startsWith("Bearer ")) {
    return authorization.replace("Bearer ", "");
  }
  return null;
};

notesRouter.post("/", async (request, response) => {
  const body = request.body;

  const decodedToken = jwt.verify(getTokenFrom(request), process.env.SECRET);

  if (!decodedToken.id) {
    return response.status(401).json({ error: "Invalid token." });
  }

  if (decodedToken.id !== body.userId) {
    return response.status(400).json({ error: "Malformated user id." });
  }

  const user = await User.findById(decodedToken.id);

  if (!user) throw new Error("User not found.");

  const note = new Note({
    content: body.content,
    important: body.important || false,
    user: user.id,
  });

  const savedNote = await note.save();
  const notes = user.notes.concat(savedNote._id.toString());
  await User.findByIdAndUpdate(user.id, { notes });

  response.status(201).json(savedNote);
});

notesRouter.delete("/:id", async (request, response) => {
  await Note.findByIdAndDelete(request.params.id);
  response.status(204).end();
});

notesRouter.put("/:id", (request, response, next) => {
  const { content, important } = request.body;

  Note.findByIdAndUpdate(
    request.params.id,
    { content, important },
    { new: true, runValidators: true, context: "query" }
  )
    .then((updatedNote) => {
      if (!updatedNote) {
        return response.status(404).end();
      }
      response.json(updatedNote);
    })
    .catch((error) => next(error));
});

module.exports = notesRouter;
