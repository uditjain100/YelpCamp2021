const express = require("express");
const router = express.Router();
const passport = require("passport");

const User = require("../models/user");

const catchAsync = require("../ulits/CatchAsyncError");

const userController = require("../controllers/users");

router.get("/signup", catchAsync(userController.renderSignUp));

router.post("/signup", catchAsync(userController.signUp));

router.get("/signin", catchAsync(userController.rendersignin));

router.post(
  "/signin",
  passport.authenticate("local", {
    failureFlash: true,
    failureRedirect: "/signin",
  }),
  catchAsync(userController.signin)
);

router.get("/signout", async (req, res) => {
  req.logout();
  req.flash("success", "Good Bye :)");
  res.redirect("/campgrounds/home");
});

module.exports = router;
