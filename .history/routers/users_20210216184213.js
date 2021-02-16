const express = require("express");
const router = express.Router();
const passport = require("passport");

const User = require("../models/user");

const catchAsync = require("../ulits/CatchAsyncError");

const userController = require("../controllers/users");

router.get("/signup", catchAsync(userController.renderSignUp));

router.post("/signup", catchAsync(userController.signUp));

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
    const redirectURL = req.session.returnTo || "/campgrounds";
    delete req.session.returnTo;
    res.redirect(redirectURL);
  }
);

router.get("/signout", async (req, res) => {
  req.logout();
  req.flash("success", "Good Bye :)");
  res.redirect("/campgrounds/home");
});

module.exports = router;
