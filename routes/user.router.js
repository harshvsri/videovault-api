const router = require("express").Router();
const isAuthenticated = require("../middlewares/isAuthenticated.middleware");
const User = require("../models/User.model");

/**
 * @route GET /users
 * @access Private
 * @desc Fetch all users
 */
router.get("/", isAuthenticated, async (req, res) => {
  const users = await User.find({});
  if (!users || users.length === 0)
    return res.status(404).json({ message: "No users found" });
  res.status(200).json(users);
});

/**
 * @route GET /users/:id
 * @access Private
 * @desc Fetch a specific user by ID
 */
router.get("/:id", isAuthenticated, async (req, res) => {
  const userID = req.params.id;
  const user = await User.findById(userID).populate("uploads");
  if (!user) return res.status(404).json({ message: "User not found" });
  res.status(200).json(user);
});

/**
 * @route PUT /users/:id
 * @access Private
 * @desc Update a specific user by ID
 */
router.put("/:id", isAuthenticated, async (req, res) => {
  const userID = req.params.id;
  const { username, fullName } = req.body;
  const user = await User.findByIdAndUpdate(userID, { username, fullName });
  if (!user) return res.status(404).json({ message: "User not found" });
  res.status(200).json({ message: "User updated" });
});

/**
 * @route DELETE /users/:id
 * @access Private
 * @desc Delete a specific user by ID
 */
router.delete("/:id", isAuthenticated, async (req, res) => {
  const userID = req.params.id;
  const user = await User.findByIdAndDelete(userID);
  if (!user) return res.status(404).json({ message: "User not found" });
  res.status(200).json({ message: "User deleted" });
});

module.exports = router;
