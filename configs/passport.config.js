const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcrypt");
const User = require("../models/User.model");

/** Passport Configuration
 * The passport-local strategy is used to authenticate users based on a username and password.
 * serializeUser tells the session what data to store (the user's ID).
 * deserializeUser takes that data from the session and uses it to retrieve the full user object.
 */
const strategy = new LocalStrategy(async (username, password, done) => {
  const user = await User.findOne({ username: username });
  if (!user) return done(null, false, { message: "Incorrect username" });

  // Verify the password
  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid)
    return done(null, false, { message: "Incorrect password" });

  return done(null, user);
});

passport.use(strategy);

/** Serialize user
 * This function is used to decide what data from the user object should be stored in the session.
 * The result of the serializeUser method is attached to the session as req.session.passport.user = {}.
 * Here we are storing the user's id in the session.
 */
passport.serializeUser((user, done) => {
  done(null, user._id);
});

/** Deserialize user
 * This function is used to retrieve the user from the session.
 * The first argument of deserializeUser corresponds to the key of the user object that was given to the done function.
 * So your whole object is retrieved with help of that key.
 * That key here is the user id. In deserializeUser that key is matched with the database.
 * The fetched object is attached to the request object as req.user
 */
passport.deserializeUser(async (id, done) => {
  const user = await User.findById(id);
  if (!user) return done(null, false);
  return done(null, user);
});
