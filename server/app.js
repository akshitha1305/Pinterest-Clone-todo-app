const express = require("express");
const path = require("path");
const passport = require("passport");
const cors = require("cors");
const usersRouter = require("./controllers/users");
const middleware = require("./utils/middleware");
const logger = require("./utils/logger");
const mongoose = require("mongoose");

const app = express();

logger.info("Connecting to: ", process.env.MONGODB_URI);
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    logger.info("Connected to MongoDB Database");
  })
  .catch((error) => {
    logger.error("Error Connecting to MongoDB:", error.message);
  });    
    

app.use(cors());
app.use(express.json());

app.use(passport.initialize());
require("./utils/passport")(passport);

app.use(middleware.requestLogger);

app.use("/api/users", usersRouter);

if (process.env.NODE_ENV === "production") {
  const buildPath = path.resolve(__dirname, "..", "client", "build");
  app.use(express.static(buildPath));
  app.get("*", (request, response) => {
    response.sendFile(path.join(buildPath, "index.html"));
  });
}

app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

module.exports = app;
