const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");




























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
});

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
  followers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }], // List of users following this user
  following: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }], // List of users this user is following
});

userSchema.plugin(uniqueValidator);

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
