const user = require("./models/user");

module.exports.isUserAuthenticated = (req, res, next) => {
  if (!req.isAuthenticated()) {
    req.flash("error", "Sign In First !!");
    return res.redirect("/campgrounds/home");
  }
  next();
};
