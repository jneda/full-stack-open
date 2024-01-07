require("dotenv").config();

const express = require("express");
const cors = require("cors");

const Note = require("./models/note");

const app = express();

app.use(cors());
app.use(express.static("dist"));
app.use(express.json());

const requestLogger = (request, response, next) => {
  console.log("Method:", request.method);
  console.log("Path:", request.path);
  console.log("Body:", request.body);
  console.log("---");
  next();
};

app.use(requestLogger);

app.get("/api/notes", (request, response) => {
  Note.find({}).then((notes) => response.json(notes));
});

app.post("/api/notes", (request, response, next) => {
  const body = request.body;

  const note = new Note({
    content: body.content,
    important: body.important || false,
  });

  note
    .save()
    .then((savedNote) => response.json(savedNote))
    .catch((error) => next(error));
});

app.get("/api/notes/:id", (request, response, next) => {
  Note.findById(request.params.id)
    .then((note) => {
      if (!note) {
        return response.status(404).end();
      }
      response.json(note);
    })
    .catch((error) => next(error));
});

app.put("/api/notes/:id", (request, response, next) => {
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

app.delete("/api/notes/:id", (request, response, next) => {
  Note.findByIdAndDelete(request.params.id)
    .then((result) => response.status(204).end())
    .catch((error) => next(error));
});

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: "Unknown endpoint" });
};

// handler of requests with unknown endpoint
app.use(unknownEndpoint);

const errorHandler = (error, request, response, next) => {
  console.error(error.message);

  if (error.name === "CastError") {
    return response.status(400).send({ error: "Malformed id." });
  } else if (error.name === "ValidationError") {
    return response.status(400).json({ error: error.message });
  }

  next(error);
};

// handler of requests which result in errors
app.use(errorHandler);

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}.`);
});
