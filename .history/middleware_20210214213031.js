const user = require("./models/user");

module.exports = (req, res, next) => {
  if (!req.isAuthenticated()) {
    req.flash("error", "Sign In First !!");
    res.redirect("/home");
  }
};
