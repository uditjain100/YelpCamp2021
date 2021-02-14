const path = require("path");
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const methodoverride = require("method-override");
const ejsMate = require("ejs-mate");
const session = require("express-session");
const flash = require("connect-flash");
const passport = require("passport");
const localStrategy = require("passport-local");

const ExpressError = require("./ulits/ExpressError");

const campgrounds = require("./routers/campgrounds");
const reviews = require("./routers/reviews");

const User = require("./models/user");

mongoose
  .connect("mongodb://localhost:27017/yelp-camp", {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .then(() => {
    console.log("Database got Connected (:)");
  })
  .catch((error) => {
    console.log("Oh No ERROR ::(");
    console.log(error);
  });

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(express.urlencoded({ extended: true }));
app.use(methodoverride("_method"));

app.use(express.static(path.join(__dirname, "public")));
const sessionConfig = {
  secret: "notagoodsecret",
  resave: false,
  saveUninitialized: false,
  cookie: {
    httpOnly: true,
    expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
    maxAge: 1000 * 60 * 60 * 24 * 7,
  },
};
app.use(session(sessionConfig));
app.use(flash());

app.use((req, res, next) => {
  res.locals.success = req.flash("success");
  res.locals.error = req.flash("error");
  res.locals.del = req.flash("del");
  next();
});

app.use("/campgrounds", campgrounds);
app.use("/campgrounds/:id/reviews", reviews);

app.engine("ejs", ejsMate);

app.all("*", (req, res, next) => {
  next(new ExpressError(404, "Page Not Found :("));
});

app.use((err, req, res, next) => {
  const { statusCode = 500, message = "Something went wrong" } = err;
  res.status(statusCode).render("./campground/error.ejs", { err });
});

app.listen(3000, () => {
  console.log("Server got started !!");
});
