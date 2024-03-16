const mongoose = require("mongoose");

const uploadSchema = new mongoose.Schema({
  userID: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  title: {
    type: String,
    required: true,
    min: 3,
    max: 50,
  },
  description: {
    type: String,
    required: true,
    min: 3,
    max: 500,
  },
  thumbnailURL: {
    type: String,
    required: true,
  },
  videoURL: {
    type: String,
    required: true,
  },
  likes: {
    type: Number,
    default: 0,
  },
  comments: [{ type: mongoose.Schema.Types.ObjectId, ref: "Comment" }],
});

const Upload = mongoose.model("Upload", uploadSchema);
module.exports = Upload;
