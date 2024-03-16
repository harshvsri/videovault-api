const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  upload: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Upload",
  },
  content: {
    type: String,
    required: true,
    min: 3,
    max: 500,
  },
});

const Upload = mongoose.model("Comment", commentSchema);
module.exports = Upload;
