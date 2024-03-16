var MongoStore = require("connect-mongo");

/** Session Configuration
 * It creates a session middleware with the given options.
 * The session middleware is used to store the user data between requests.
 * The data is stored on the server, and a session ID is sent to the client in a cookie.
 */
const sessionOptions = {
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  store: MongoStore.create({ mongoUrl: process.env.MONGO_URI }),
  cookie: {
    maxAge: 1000 * 60 * 60 * 24, // 1 day
  },
};

module.exports = sessionOptions;
