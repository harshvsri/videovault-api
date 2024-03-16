const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    min: 3,
    max: 20,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    min: 6,
  },
  fullName: {
    type: String,
    required: true,
    min: 3,
    max: 50,
  },
  profileImg: {
    type: String,
    default: "",
  },
  uploads: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Upload",
      default: [],
    },
  ],
  likedUploads: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Upload",
      default: [],
    },
  ],
});

const User = mongoose.model("User", userSchema);
module.exports = User;
