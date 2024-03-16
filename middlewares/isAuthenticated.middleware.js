/** isAuthenticated
 * It is a middleware that checks if the user is authenticated.
 */

function isAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    next();
  } else {
    return res.status(403).json({ message: "Unauthorized" });
  }
}

module.exports = isAuthenticated;
