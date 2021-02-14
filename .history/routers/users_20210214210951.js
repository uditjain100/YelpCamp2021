const express = require("express");
const router = express.Router();
const User = require("../models/user");
const catchAsync = require("../ulits/CatchAsyncError");

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
      req.flash("error", e);
    }
  })
);

router.get("/signin", async (req, res) => {
  res.render("./auth/signin.ejs");
});

router.post("/signin", async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });
  if (!user) return res.redirect("/signin");
  await bcrypt.compare(password, user.password, async function (err, same) {
    if (!same) return res.redirect("/signin");
    req.session.userid = user._id;
    return res.render("secret.ejs", { user });
  });
});

module.exports = router;
