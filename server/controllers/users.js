const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const usersRouter = require("express").Router();
const passport = require("passport");
const User = require("../models/user");

// usersRouter.post("/signup", async (request, response) => {
//   const body = request.body;

//   let user;
//   try {
//     user = await User.findOne({ username: body.username });
//   } catch (exception) {
//     return response
//       .status(500)
//       .json({ error: "A database error has occurreddd" });
//   }
//   if (user) {
//     return response
//       .status(400)
//       .json({ error: "The username has already been taken" });
//   }

//   const saltRounds = 10;
//   const passwordHash = await bcrypt.hash(body.password, saltRounds);

//   const newUser = new User({
//     username: body.username,
//     name: body.name,
//     passwordHash: passwordHash,
//   });

//   try {
//     const savedUser = await newUser.save();
//     return response.json(savedUser);
//   } catch (exception) {
//     return response
//       .status(500)
//       .json({ error: "A database error has occurred" });
//   }
// });
usersRouter.post("/signup", async (request, response) => {
  const body = request.body;

  try {
    // Log the incoming request body (make sure to not log passwords in production)
    console.log("Signup attempt:", { username: body.username, name: body.name });

    const existingUser = await User.findOne({ username: body.username });

    if (existingUser) {
      console.log("Username already exists:", body.username);
      return response
        .status(400)
        .json({ error: "The username has already been taken" });
    }

    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(body.password, saltRounds);

    const newUser = new User({
      username: body.username,
      name: body.name,
      passwordHash: passwordHash,
    });

    // Log the new user object before saving (omit sensitive data)
    console.log("Attempting to save new user:", {
      username: newUser.username,
      name: newUser.name
    });

    const savedUser = await newUser.save();
    console.log("User saved successfully:", savedUser._id);
    return response.json(savedUser);
  } catch (exception) {
    console.error("Error during user signup:", exception);

    // Check for specific MongoDB errors
    if (exception.name === 'ValidationError') {
      return response.status(400).json({ error: "Invalid user data: " + exception.message });
    }
    if (exception.name === 'MongoServerError' && exception.code === 11000) {
      return response.status(400).json({ error: "Username must be unique" });
    }

    return response
      .status(500)
      .json({ error: "A database error has occurred", details: exception.message });
  }
});

usersRouter.post("/login", async (request, response) => {
  const body = request.body;

  let user;
  try {
    user = await User.findOne({ username: body.username });
  } catch (exception) {
    return response
      .status(500)
      .json({ error: "A database error has occurred" });
  }

  const isPasswordCorrect =
    user === null
      ? false
      : await bcrypt.compare(body.password, user.passwordHash);

  if (!user || !isPasswordCorrect) {
    return response.status(401).json({ error: "Invalid username or password" });
  }

  const payload = {
    id: user._id,
    username: user.username,
    name: user.name,
  };

  const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: 3600 });

  return response.status(200).send({ token: `Bearer ${token}` });
});

usersRouter.get(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  async (request, response) => {
    try {
      const user = await User.findById(request.params.id);
      return response.json(user);
    } catch (exception) {
      return response
        .status(500)
        .json({ error: "A database error has occurred" });
    }
  }
);

usersRouter.put(
  "/:id/save-pin",
  passport.authenticate("jwt", { session: false }),
  async (request, response) => {
    try {
      const user = await User.findByIdAndUpdate(
        request.params.id,
        { $addToSet: { savedPins: request.body.photoUrl } },
        { new: true }
      );
      return response.json(user);
    } catch (exception) {
      return response
        .status(500)
        .json({ error: "A database error has occurred" });
    }
  }
);

usersRouter.put(
  "/:id/delete-pin",
  passport.authenticate("jwt", { session: false }),
  async (request, response) => {
    try {
      const user = await User.findByIdAndUpdate(
        request.params.id,
        { $pull: { savedPins: request.body.photoUrl } },
        { new: true }
      );
      return response.json(user);
    } catch (exception) {
      return response
        .status(500)
        .json({ error: "A database error has occurred" });
    }
  }
);

module.exports = usersRouter;
