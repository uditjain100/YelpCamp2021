const express = require("express");
const router = express.Router();
const User = require("../models/user");

router.get("/signup", async (req, res) => {
  console.log(require("path"));
  res.render("./auth/signup.ejs");
});

router.post("/signup", async (req, res) => {
  const { username, password } = req.body;
  await bcrypt.hash(password, 12, async function (err, hash) {
    var user = new User({ username: username, password: hash });
    await user.save();
    req.session.userid = user._id;
    return res.render("secret.ejs");
  });
});

router.get("/signin", async (req, res) => {
  res.render("signin.ejs");
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
