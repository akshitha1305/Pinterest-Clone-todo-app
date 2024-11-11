const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

// Define a schema for comments
const commentSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, // Reference to user who made the comment
  username: String,
  avatarUrl: String,
  text: { type: String, required: true },
  timestamp: { type: Date, default: Date.now },
  likes: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }]
});

// Define the schema for pins, with comments as an array of `commentSchema`
const pinSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  imageUrl: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  comments: [commentSchema] // Array of comments for each pin
});

// Define the schema for users
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    requred: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
  },
  passwordHash: {
    type: String,
    required: true,
  },
  savedPins: {
    type: [String],
  },
  likedPins: {
    type: [String],
  },
  customPins: {
    type: [pinSchema], // Array of custom pins based on pinSchema
  },
  hiddenPins: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Pin' }],
  followers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }], // List of users following this user
  following: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }], // List of users this user is following
});

// Plugin for enforcing unique constraints on fields
userSchema.plugin(uniqueValidator);

// Transform JSON output to hide sensitive data
userSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
    delete returnedObject.passwordHash;
  },
});

const User = mongoose.model("User", userSchema);
module.exports = User;
