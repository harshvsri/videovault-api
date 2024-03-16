require("dotenv").config();
var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var cors = require("cors");
var session = require("express-session");
var passport = require("passport");

var indexRouter = require("./routes/index.router");
var userRouter = require("./routes/user.router");
var uploadRouter = require("./routes/upload.router");
var connectDB = require("./configs/db.config");
var corsOptions = require("./configs/cors.config");
var sessionOptions = require("./configs/session.config");
require("./configs/passport.config");

var app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

connectDB();
app.use(session(sessionOptions));
app.use(cors(corsOptions));
app.use(passport.initialize());
app.use(passport.session());

// debug session and user
app.use((req, res, next) => {
  console.log("Session info:", req.session);
  console.log("User info:", req.user);
  next();
});

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

// routes setup
app.use("/", indexRouter);
app.use("/users", userRouter);
app.use("/uploads", uploadRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  // res.locals.message = err.message;
  const errorDetails = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.json(errorDetails);
});

module.exports = app;
