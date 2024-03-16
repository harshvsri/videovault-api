const mongoose = require("mongoose");

const connectDB = () => {
  mongoose.connect(process.env.MONGO_URI);
  mongoose.connection.once("open", () => console.log("Connected to MongoDB"));
};

module.exports = connectDB;
