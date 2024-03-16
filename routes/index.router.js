const router = require("express").Router();
const bcrypt = require("bcrypt");
const User = require("../models/User.model");
const authenticate = require("../middlewares/authenticate.middleware");
const isAuthenticated = require("../middlewares/isAuthenticated.middleware");

/**
 * @route POST /register
 * @access Public
 * @desc Register a new user
 */
router.post("/register", async (req, res, next) => {
  const { username, password, fullName } = req.body;

  // Check if the username already exists
  const userExists = await User.findOne({ username: username });
  if (userExists)
    return res.status(400).json({ message: "Username already exists" });

  // Hash the password
  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await User.create({
    username,
    password: hashedPassword,
    fullName,
  });

  // Manually log the user in after registration
  req.logIn(user, (err) => {
    if (err) {
      return next(err);
    }
    return res.status(200).json({
      message: "Registration successful",
      // Sending only the necessary user details
      user: {
        _id: user._id,
        username: user.username,
        fullName: user.fullName,
      },
    });
  });
});

/**
 * @route POST /login
 * @access Public
 * @desc Authenticate a user
 */
router.post("/login", authenticate);

/**
 * @route GET /logout
 * @access Private
 * @desc Logout a user
 */
router.get("/logout", isAuthenticated, (req, res) => {
  req.logOut(() => res.status(200).json({ message: "Logout successful" }));
});

module.exports = router;
