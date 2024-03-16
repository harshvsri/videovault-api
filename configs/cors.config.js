/** Allowed Origins
 * Handles requests from a frontend web application.
 * This file sets up CORS configuration options for the backend server, which ensures that requests are only allowed from specified origins and credentials are properly handled.
 */
const allowedOrigins = ["http://localhost:3000", "http://localhost:5173"];

const corsOptions = {
  origin: (origin, callback) => {
    if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
  optionsSuccessStatus: 200,
};

module.exports = corsOptions;
