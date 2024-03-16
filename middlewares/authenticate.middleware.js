const passport = require("passport");

/** Authenticate
 * It uses strategy(local) to authenticate the user.
 * If the user is authenticated, it logs the user in.
 */
function authenticate(req, res, next) {
  passport.authenticate("local", (err, user, info) => {
    if (err) {
      return next(err);
    }
    if (!user) {
      return res.status(401).json(info);
    }

    // Log the user in
    req.logIn(user, (err) => {
      if (err) {
        return next(err);
      }
      return res.status(200).json({
        message: "Login successful",
        // Sending only the necessary user details
        user: {
          _id: user._id,
          username: user.username,
          fullName: user.fullName,
        },
      });
    });
  })(req, res, next);
}

module.exports = authenticate;
