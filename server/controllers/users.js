const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const usersRouter = require("express").Router();
const passport = require("passport");
const User = require("../models/user");
const mongoose = require("mongoose");

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
// Get all pins created by different users
usersRouter.get("/get/random-pins", passport.authenticate("jwt", { session: false }), async (request, response) => {
  try {
    // Fetch the current user's hidden pins array
    const userId = request.user._id;
    const user = await User.findById(userId).select("hiddenPins");

    const hiddenPins = user?.hiddenPins || [];

    const randomPins = await User.aggregate([
      { $match: { customPins: { $exists: true, $not: { $size: 0 } } } },
      { $unwind: "$customPins" },
      {
        $addFields: {
          isHidden: { $in: ["$customPins._id", hiddenPins] }
        }
      },
      { $sample: { size: 100 } },
      {
        $lookup: {
          from: "users",
          let: { pinImageUrl: "$customPins.imageUrl" },
          pipeline: [
            { $match: { likedPins: { $exists: true, $type: "array" } } },
            { $match: { $expr: { $in: ["$$pinImageUrl", "$likedPins"] } } },
            { $project: { username: 1, name: 1, avatarUrl: 1 } }
          ],
          as: "likers"
        }
      },
      {
        $addFields: {
          totalLikes: { $size: "$likers" }
        }
      },
      {
        $project: {
          _id: 0,
          "customPins._id": 1,
          "customPins.title": 1,
          "customPins.imageUrl": 1,
          "customPins.createdAt": 1,
          isHidden: 1,
          username: 1,
          pin_owner_id: "$_id",
          name: 1,
          likers: 1,
          totalLikes: 1
        }
      }
    ]);


    if (!randomPins || randomPins.length === 0) {
      return response.status(404).json({ error: "No pins found" });
    }

    response.json(
      randomPins.map((pin) => ({
        pin_id: pin.customPins._id,
        title: pin.customPins.title,
        imageUrl: pin.customPins.imageUrl,
        createdAt: pin.customPins.createdAt,
        username: pin.username,
        pin_owner_id: pin.pin_owner_id,
        name: pin.name,
        likers: pin.likers,
        totalLikes: pin.totalLikes
      }))
    );
  } catch (error) {
    console.error("Error details:", error);
    response.status(500).json({ error: "A database error has occurred", details: error.message });
  }
});


// Fetch user created pins
usersRouter.get("/get/pins/user-pins", async (req, res) => {
  const { pin_owner_id } = req.query;

  try {
    const userPins = await User.aggregate([
      { $match: { _id: mongoose.Types.ObjectId(pin_owner_id), customPins: { $exists: true, $not: { $size: 0 } } } },
      { $unwind: "$customPins" },
      {
        $lookup: {
          from: "users",
          let: { pinImageUrl: "$customPins.imageUrl" },
          pipeline: [
            { $match: { likedPins: { $exists: true, $type: "array" } } }, // Ensure `likedPins` is an array
            { $match: { $expr: { $in: ["$$pinImageUrl", "$likedPins"] } } },
            { $project: { username: 1, name: 1, avatarUrl: 1 } }
          ],
          as: "likers"
        }
      },
      {
        $addFields: {
          totalLikes: { $size: "$likers" }
        }
      },
      {
        $project: {
          _id: 0,
          "customPins._id": 1,
          "customPins.title": 1,
          "customPins.imageUrl": 1,
          "customPins.createdAt": 1,
          username: 1,
          pin_owner_id: "$_id",
          name: 1,
          likers: 1,
          totalLikes: 1
        }
      }
    ]);

    if (!userPins || userPins.length === 0) {
      return res.status(404).json({ error: "No pins found for this user" });
    }

    res.json(userPins.map(pin => ({
      pin_id: pin.customPins._id,
      title: pin.customPins.title,
      imageUrl: pin.customPins.imageUrl,
      createdAt: pin.customPins.createdAt,
      username: pin.username,
      pin_owner_id: pin.pin_owner_id,
      name: pin.name,
      likers: pin.likers,
      totalLikes: pin.totalLikes
    })));
  } catch (error) {
    console.error("Error details:", error);
    res.status(500).json({ error: "A database error has occurred", details: error.message });
  }
});

// Edit pin endpoint
usersRouter.put("/pin/pin-edit/:pinId", async (req, res) => {
  const { pinId } = req.params;
  const { title, imageUrl } = req.body; // New values to update

  try {
    // Use `$set` to update fields within the subdocument
    const result = await User.updateOne(
      { "customPins._id": pinId },
      {
        $set: {
          "customPins.$.title": title,
          "customPins.$.imageUrl": imageUrl,
        },
      }
    );

    if (result.modifiedCount === 0) {
      return res.status(404).json({ error: "Pin not found or no changes made" });
    }

    res.json({ message: "Pin updated successfully" });
  } catch (error) {
    console.error("Error updating pin:", error);
    res.status(500).json({ error: "Failed to update pin", details: error.message });
  }
});

// Delete pin endpoint from the user pins
usersRouter.delete("/pin/pin-delete/:pinId", async (req, res) => {
  const { pinId } = req.params;
  console.log('pin to delete is', pinId);

  try {
    // Find the user document containing the pin
    const user = await User.findOne({ "customPins._id": pinId });
    if (!user) return res.status(404).json({ error: "User or pin not found" });

    // Remove the pin from customPins array using $pull in the update method
    const result = await User.updateOne(
      { _id: user._id },
      { $pull: { customPins: { _id: pinId } } }
    );

    if (result.modifiedCount === 0) {
      return res.status(404).json({ error: "Pin not found or already deleted" });
    }

    res.json({ message: "Pin deleted successfully" });
  } catch (error) {
    console.error("Error deleting pin:", error);
    res.status(500).json({ error: "Failed to delete pin", details: error.message });
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
// Hide pin
usersRouter.put("/pin/hide/:pinId", passport.authenticate('jwt', { session: false }), async (req, res) => {
  const { pinId } = req.params;
  const userId = req.user.id;

  try {
    // Update user's hiddenPins array by adding the pin ID if not already present
    await User.findByIdAndUpdate(userId, {
      $addToSet: { hiddenPins: pinId }
    });
    res.status(200).json({ message: 'Pin hidden successfully' });
  } catch (error) {
    console.error('Failed to hide pin:', error);
    res.status(500).json({ error: 'Failed to hide pin' });
  }
});

// Unhide pin
usersRouter.put("/pin/unhide/:pinId", passport.authenticate('jwt', { session: false }), async (req, res) => {
  const { pinId } = req.params;
  const userId = req.user.id;

  try {
    // Update user's hiddenPins array by removing the pin ID
    await User.findByIdAndUpdate(userId, {
      $pull: { hiddenPins: pinId }
    });
    res.status(200).json({ message: 'Pin unhidden successfully' });
  } catch (error) {
    console.error('Failed to unhide pin:', error);
    res.status(500).json({ error: 'Failed to unhide pin' });
  }
});




module.exports = usersRouter;
