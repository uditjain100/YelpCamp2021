const User = require("../models/user");

module.exports.renderSignUp = async (req, res) => {
  res.render("./auth/signup.ejs");
};

module.exports.signUp = async (req, res) => {
  try {
    const { email, username, password } = req.body;
    const user = new User({ email, username });
    const registeredUser = await User.register(user, password);
    req.login(registeredUser, (err) => {
      if (err) return next(err);
      req.flash("success", "Welcome to YelpCamp 😊");
      res.redirect("/campgrounds");
    });
  } catch (e) {
    req.flash("error", e.message);
    res.redirect("/signup");
  }
};

module.exports.rendersignin = async (req, res) => {
  res.render("./auth/signin.ejs");
};

module.exports.signin = async (req, res) => {
  req.flash("success", "Welcome Back 😊");
  const redirectURL = req.session.returnTo || "/campgrounds";
  delete req.session.returnTo;
  res.redirect(redirectURL);
};

module.exports.signOut = async (req, res) => {
  req.logout();
  req.flash("success", "Good Bye :)");
  res.redirect("/campgrounds/home");
};
