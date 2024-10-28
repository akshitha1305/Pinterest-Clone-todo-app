const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const usersRouter = require("express").Router();
const passport = require("passport");
const User = require("../models/user");

//signup route
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
    const savedUser = await newUser.save();
    return response.json(savedUser);
  } catch (exception) {
    return response.status(500).json({ error: "A database06 error has occurred", details: exception.message });
  }
});
 
//login route
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

  // return response.status(200).send({ token: `Bearer ${token}` });
  return response.status(200).send({
    token: `Bearer ${token}`, // Return the token with Bearer prefix
    userId: user._id // Return the user ID
  });
});


usersRouter.get(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  async (request, response) => {
    try {
      console.log('Getting user data', request.params.id);
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

// Like pin
usersRouter.put(
  "/:id/like-pin",
  passport.authenticate("jwt", { session: false }),
  async (request, response) => {
    try {
      const user = await User.findByIdAndUpdate(
        request.params.id,
        { $addToSet: { likedPins: request.body.photoUrl } },
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

// Unlike a pin
usersRouter.put(
  "/:id/unlike-pin",
  passport.authenticate("jwt", { session: false }),
  async (request, response) => {
    try {
      const user = await User.findByIdAndUpdate(
        request.params.id,
        { $pull: { likedPins: request.body.photoUrl } },
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



// New endpoint: Create a custom pin
usersRouter.post(
  "/:id/create-pin",
  passport.authenticate("jwt", { session: false }),
  async (request, response) => {
    const { title, imageUrl } = request.body;

    try {
      // Create a new pin object
      const newPin = {
        title,
        imageUrl,
        createdAt: new Date(),
      };

      // Update the user by adding the new pin to the customPins array
      const updatedUser = await User.findByIdAndUpdate(
        request.params.id,
        { $push: { customPins: newPin } }, // Push the new pin to the customPins array
        { new: true, runValidators: true } // Return the updated user and run validation
      );

      if (!updatedUser) {
        return response.status(404).json({ error: "User not found" });
      }

      return response.status(201).json(updatedUser);
    } catch (exception) {
      console.error("Error creating custom pin:", exception);
      return response
        .status(500)
        .json({ error: "A database error has occurred", details: exception.message });
    }
  }
);

usersRouter.get("/get/random-pins", async (request, response) => {
  try {
    // Query MongoDB for custom pins in all users
    const randomPins = await User.aggregate([
      { $match: { customPins: { $exists: true, $not: { $size: 0 } } } }, // Only include users with customPins
      { $unwind: "$customPins" }, // Unwind the customPins array
      { $sample: { size: 100 } }, // Get a random sample of 100 pins (adjust size as needed)
      {
        $project: {
          _id: 0,
          "customPins.title": 1,
          "customPins.imageUrl": 1,
          "customPins.createdAt": 1,
          username: 1,
          _id: 1,
          name: 1 // Include username and name fields
        }
      }
    ]);

    if (!randomPins || randomPins.length === 0) {
      return response.status(404).json({ error: "No pins found" });
    }

    // Respond with the random pins, including username and name
    response.json(randomPins.map(pin => ({
      title: pin.customPins.title,
      imageUrl: pin.customPins.imageUrl,
      createdAt: pin.customPins.createdAt,
      username: pin.username,
      pin_owner_id: pin._id,
      name: pin.name
    })));
  } catch (error) {
    response.status(500).json({ error: "A database error has occurred" });
  }
});

// Route to follow a user
usersRouter.post('/follow/user', async (req, res) => {
  const { userIdToFollow, loggedInUserId } = req.body; // userIdToFollow: user to follow, loggedInUserId: logged-in user

  try {
    // Update the followers list of the target user (userIdToFollow)
    await User.findByIdAndUpdate(userIdToFollow, {
      $addToSet: { followers: loggedInUserId } // Ensure no duplicates
    });

    // Update the following list of the logged-in user
    await User.findByIdAndUpdate(loggedInUserId, {
      $addToSet: { following: userIdToFollow } // Ensure no duplicates
    });

    res.status(200).json({ message: "User followed successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to follow user" });
  }
});

// Route to unfollow a user
usersRouter.post('/unfollow/user', async (req, res) => {
  const { userIdToUnfollow, loggedInUserId } = req.body;

  try {
    // Update the followers list of the target user (userIdToUnfollow)
    await User.findByIdAndUpdate(userIdToUnfollow, {
      $pull: { followers: loggedInUserId }
    });

    // Update the following list of the logged-in user
    await User.findByIdAndUpdate(loggedInUserId, {
      $pull: { following: userIdToUnfollow }
    });

    res.status(200).json({ message: "User unfollowed successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to unfollow user" });
  }
});

// Route to get followers of a user
usersRouter.get('/:userId/followers', async (req, res) => {
  const { userId } = req.params;

  try {
    const user = await User.findById(userId).populate('followers', 'username name');
    res.status(200).json(user.followers);
  } catch (error) {
    res.status(500).json({ error: "Failed to get followers" });
  }
});

// Route to get users the logged-in user is following
usersRouter.get('/:userId/following', async (req, res) => {
  const { userId } = req.params;

  try {
    const user = await User.findById(userId).populate('following', 'username name');
    res.status(200).json(user.following);
  } catch (error) {
    res.status(500).json({ error: "Failed to get following list" });
  }
});


module.exports = usersRouter;
