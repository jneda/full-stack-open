const { ApolloServer } = require("@apollo/server");
const { startStandaloneServer } = require("@apollo/server/standalone");

const mongoose = require("mongoose");
mongoose.set("strictQuery", false);

const jwt = require("jsonwebtoken");

const User = require("./models/user");

const typeDefs = require("./schema");
const resolvers = require("./resolvers");

require("dotenv").config();

const MONGDB_URI = process.env.MONGODB_URI;

console.log("Connecting to MongoDB...");

mongoose
  .connect(MONGDB_URI)
  .then(() => console.log("Connected to MongoDB."))
  .catch((error) => console.log("Error connecting to MongoDB:", error.message));

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

startStandaloneServer(server, {
  listen: { port: 4000 },
  context: async ({ req, res }) => {
    const auth = req ? req.headers.authorization : null;

    if (auth && auth.startsWith("Bearer ")) {
      const decodedToken = jwt.verify(
        auth.replace("Bearer ", ""),
        process.env.JWT_SECRET
      );

      const currentUser = await User.findById(decodedToken.id);
      return { currentUser };
    }
  },
}).then(({ url }) => {
  console.log(`Server ready at ${url}`);
});
