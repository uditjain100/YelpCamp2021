const express = require("express");
const router = express.Router();
const passport = require("passport");

const catchAsync = require("../ulits/CatchAsyncError");

const userController = require("../controllers/users");

router
  .route("/signup")
  .get(catchAsync(userController.renderSignUp))
  .post(catchAsync(userController.signUp));

router
  .route("/signin")
  .get(catchAsync(userController.rendersignin))
  .post(
    passport.authenticate("local", {
      failureFlash: true,
      failureRedirect: "/signin",
    }),
    catchAsync(userController.signin)
  );

router.get("/signout", catchAsync(userController.signOut));

module.exports = router;
