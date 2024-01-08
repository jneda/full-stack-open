const mongoose = require("mongoose");

const isUsernameUnique = async (username) => {
  const existingUsername = await mongoose
    .model("User")
    .find({ username: username });
  return existingUsername.length === 0;
};

const userSchema = mongoose.Schema({
  username: {
    type: String,
    validate: {
      validator: isUsernameUnique,
      message: "Expected `username` to be unique.",
    },
  },
  name: String,
  passwordHash: String,
  notes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Note",
    },
  ],
});

userSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
    delete returnedObject.passwordHash;
  },
});

module.exports = mongoose.model("User", userSchema);
