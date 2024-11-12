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
  const existingUser = await User.findOne({ username: body.username });

    if (existingUser) {
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
  
  return response.status(200).send({
    token: `Bearer ${token}`, // Return the token with Bearer prefix
    userId: user._id // Return the user ID
    username: user.username
  });
});

// Get user profile by ID
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

// Get user by username - this is used to fetch details of another user
usersRouter.get("/user/:username", async (req, res) => {
  const { username } = req.params;

  try {
    // Find the user by username (assuming `username` is unique)
    const user = await User.findOne({ username: username });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Return the user data, excluding sensitive fields like password
    res.json({
      id: user._id,
      username: user.username,
      name: user.name,
    });
  } catch (error) {
    console.error("Error fetching user:", error);
    res.status(500).json({ message: "Error fetching user data", error: error.message });
  }
});


// Save pin
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

// delete Saved pin
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

// Get all pins created by different users
usersRouter.get("/get/random-pins", async (request, response) => {
  try {
    // Fetch the current user's hidden pins array
    const userId = request.user._id;
    const user = await User.findById(userId).select("hiddenPins");

    const hiddenPins = user?.hiddenPins || [];
    const randomPins = await User.aggregate([
      { $match: { customPins: { $exists: true, $not: { $size: 0 } } } }, // Only include users with customPins
      { $unwind: "$customPins" }, // Unwind the customPins array
      {
        $addFields: {
          isHidden: { $in: ["$customPins._id", hiddenPins] }
        }
      },
      
      { $sample: { size: 100 } }, // Get a random sample of 100 pins (adjust size as needed)
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
    response.status(500).json({ error: "A database error has occurred" });
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

// Add a comment to a specific pin
usersRouter.post("/pin/add-comment", async (req, res) => {
  const { pin_id, userId, auth_username, text } = req.body;

  try {
    // Create the new comment object
    const newComment = {
      userId,
      username: auth_username,
      text,
      timestamp: new Date()
    };

    // Update the specific pin's comments array inside customPins
    const result = await User.updateOne(
      { "customPins._id": pin_id }, // Find the user with the specific pinId in customPins
      { $push: { "customPins.$.comments": newComment } } // Push the new comment to the comments array of the found pin
    );

    if (result.nModified === 0) {
      return res.status(404).json({ error: "Pin not found" });
    }

    res.status(201).json(newComment); // Send back the new comment
  } catch (error) {
    console.error("Failed to add comment:", error);
    res.status(500).json({ error: "Failed to add comment", details: error.message });
  }
});

// Endpoint to fetch comments for a specific pin
usersRouter.get("/pin/:pinId/comments", async (req, res) => {
  const { pinId } = req.params;

  try {
    // Find the user document containing the pin with the specified pinId in customPins
    const user = await User.findOne({ "customPins._id": pinId });
    if (!user) {
      return res.status(404).json({ error: "Pin not found" });
    }

    // Find the specific pin in the user's customPins array
    const pin = user.customPins.id(pinId);
    if (!pin) {
      return res.status(404).json({ error: "Pin not found in user's custom pins" });
    }

    // Sort the comments by timestamp in descending order
    const sortedComments = pin.comments.sort((a, b) => b.timestamp - a.timestamp);

    // Return the sorted comments for the specified pin
    res.status(200).json(sortedComments);
  } catch (error) {
    console.error("Failed to fetch comments:", error);
    res.status(500).json({ error: "Failed to fetch comments", details: error.message });
  }
});


// Delete a comment on a pin
usersRouter.delete("/pin/comment/:commentId/deleted", passport.authenticate("jwt", { session: false }), async (req, res) => {
  const { commentId } = req.params;
  const userId = req.user.id;

  try {
    const result = await User.updateOne(
      {
        "customPins.comments._id": commentId,
        "customPins.comments.userId": userId
      },
      {
        $pull: { "customPins.$[].comments": { _id: commentId } }
      }
    );

    if (result.modifiedCount === 0) {
      return res.status(404).json({ error: "Comment not found or you're not authorized to delete this comment" });
    }

    res.status(200).json({ message: "Comment deleted successfully" });
  } catch (error) {
    console.error("Failed to delete comment:", error);
    res.status(500).json({ error: "Failed to delete comment", details: error.message });
  }
});


// Like or unlike a comment
usersRouter.post("/pin/comment/:commentId/like", passport.authenticate("jwt", { session: false }), async (req, res) => {
  const { commentId } = req.params;
  const userId = req.user.id;

  try {
    // Find the user document containing the pin with the specified comment
    const user = await User.findOne({ "customPins.comments._id": commentId });
    if (!user) return res.status(404).json({ error: "Comment not found" });

    // Find the specific pin that contains the comment
    const pin = user.customPins.find(pin => pin.comments.some(comment => comment._id.toString() === commentId));
    if (!pin) return res.status(404).json({ error: "Pin not found" });

    // Locate the specific comment
    const comment = pin.comments.id(commentId);

    // Check if the user has already liked this specific comment
    const hasLiked = comment.likes ? comment.likes.includes(userId) : false;

    if (hasLiked) {
      // Unlike the comment if the user has already liked it
      comment.likes = comment.likes.filter(id => id.toString() !== userId);
    } else {
      // Like the comment if the user has not liked it yet
      comment.likes.push(userId);
    }
    
 // Save only the updated fields to prevent any uniqueness or constraint issues
 await User.updateOne(
   { "customPins._id": pin._id, "customPins.comments._id": commentId },
   { $set: { "customPins.$[pin].comments.$[comment].likes": comment.likes } },
   { arrayFilters: [{ "pin._id": pin._id }, { "comment._id": commentId }] }
 );

  // Send back the updated comment with the likes array
    res.status(200).json(comment);
  } catch (error) {
    console.error("Failed to like/unlike comment:", error);
    res.status(500).json({ error: "Failed to like/unlike comment", details: error.message });
  }
});

// Unified search endpoint to find users by username/name and pins by title
usersRouter.get("/search/get-results", async (req, res) => {
  const { query } = req.query;

  if (!query) {
    return res.status(400).json({ error: "Query parameter is required" });
  }

  try {
    // Search for users by username or name
    const users = await User.find({
      $or: [
        { username: { $regex: query, $options: "i" } },
        { name: { $regex: query, $options: "i" } },
      ],
    }).limit(10); // Limit to 10 results for efficiency

    // Search for pins by title within customPins array
    const pins = await User.aggregate([
      { $match: { customPins: { $exists: true, $not: { $size: 0 } } } },
      { $unwind: "$customPins" },
      { $match: { "customPins.title": { $regex: query, $options: "i" } } },
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
          username: 1,
          pin_owner_id: "$_id",
          name: 1,
          likers: 1,
          totalLikes: 1
        }
      },
      { $limit: 10 } // Limit to 10 results for efficiency
    ]);

    // Send both user and pin results in the response
    res.json({ users, pins });
  } catch (error) {
    console.error("Error during search:", error);
    res.status(500).json({ error: "A database error has occurred", details: error.message });
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

usersRouter.put("/update/password", async (req, res) => {
  const { userId, currentPassword, newPassword } = req.body;

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Verify the current password
    const isPasswordCorrect = await bcrypt.compare(currentPassword, user.passwordHash);
    if (!isPasswordCorrect) {
      return res.status(400).json({ message: "Current password is incorrect" });
    }

    // Hash the new password
    const salt = await bcrypt.genSalt(10);
    const newPasswordHash = await bcrypt.hash(newPassword, salt);

    // Update the password hash directly in the database
    await User.findByIdAndUpdate(userId, { passwordHash: newPasswordHash });

    res.status(200).json({ message: "Password updated successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error updating password", error: error.message });
  }
});

// Request Password Reset
usersRouter.post("/forgot", async (req, res) => {
  const { username } = req.body;
  const user = await User.findOne({ username });

  if (!user) {
    return res.status(404).json({ error: "User not found" });
  }

  // Generate reset token
  const resetToken = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });
  const resetUrl = `http://localhost:3000/reset-password?token=${resetToken}`;

  //res.status(200).json({ message: "Password reset link is: ", resetUrl });
  res.status(200).json({ message: "Password reset link generated", resetUrl });

});

// Reset Password
usersRouter.post("/reset/password", async (req, res) => {
  const { token, newPassword, confirmPassword } = req.body;

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.userId);

    if (!user) {
      return res.status(404).json({ status: 404, error: "User not found" });
    }

    if (newPassword !== confirmPassword) {
      res.status(200).json({ status: 200, message: "Passwords do not match" });
    } else {

      const salt = await bcrypt.genSalt(10);
      const newPasswordHash = await bcrypt.hash(newPassword, salt);
      await User.findByIdAndUpdate(decoded.userId, { passwordHash: newPasswordHash });

      res.status(200).json({ status: 200, message: "Password updated successfully" });
    }

  } catch (error) {
    res.status(200).json({ status: 200, error: "Invalid or expired token" });
  }
});

module.exports = usersRouter;
