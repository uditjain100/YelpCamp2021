const express = require("express");
const router = express.Router();
const User = require("../models/user");
const catchAsync = require("../ulits/CatchAsyncError");
const passport = require("passport");

router.get("/signup", async (req, res) => {
  res.render("./auth/signup.ejs");
});

router.post(
  "/signup",
  catchAsync(async (req, res) => {
    try {
      const { email, username, password } = req.body;
      const user = new User({ email, username });
      const registeredUser = await User.register(user, password);
      console.log(registeredUser);
      req.flash("success", "Welcome to YelpCamp 😊");
      res.redirect("/campgrounds");
    } catch (e) {
      req.flash("error", e.message);
      res.redirect("/signup");
    }
  })
);

router.get("/signin", async (req, res) => {
  res.render("./auth/signin.ejs");
});

router.post(
  "/signin",
  passport.authenticate("local", {
    failureFlash: true,
    failureRedirect: "/signin",
  }),
  async (req, res) => {
    req.flash("success", "Welcome Back 😊");
    res.redirect("/campgrounds");
  }
);

router.get("/signout", async (req, res) => {
  req.logout();
  res.redirect("/campgrounds/home");
});

module.exports = router;
