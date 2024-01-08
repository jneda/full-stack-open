const logger = require("./logger");

const errorHandler = (error, request, response, next) => {
  logger.error(error.message);

  if (error.name === "CastError") {
    return response.status(400).send({ error: "Malformed id." });
  } else if (error.name === "ValidationError") {
    return response.status(400).json({ error: error.message });
  } else if (error.name === "ValidationConflictError") {
    return response.status(409).json({ error: error.message });
  }

  if (error.message === "Resource not found.") {
    return response.status(404).end();
  }

  next(error);
};

module.exports = { errorHandler };
