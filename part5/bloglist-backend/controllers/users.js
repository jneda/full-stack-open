const bcrypt = require("bcrypt");
const usersRouter = require("express").Router();
const User = require("../models/user");

usersRouter.get("/", async (request, response) => {
  const users = await User.find({}).populate("blogs", {
    title: 1,
    author: 1,
    url: 1,
  });
  response.json(users);
});

usersRouter.post("/", async (request, response) => {
  const { username, name, password } = request.body;

  const usernameIsValid = username && username.length >= 3;
  const passwordIsValid = password && password.length >= 3;

  if (!usernameIsValid || !passwordIsValid) {
    const error = new Error(
      "Invalid username or password: 3 characters minimum."
    );
    error.name = "ValidationError";
    throw error;
  }

  const usernameExists = await User.findOne({ username });
  if (usernameExists) {
    const error = new Error("Username already exists.");
    error.name = "ValidationConflictError";
    throw error;
  }

  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(password, saltRounds);

  const user = new User({
    username,
    name,
    passwordHash,
  });

  const savedUser = await user.save();

  response.status(201).json(savedUser);
});

module.exports = usersRouter;
