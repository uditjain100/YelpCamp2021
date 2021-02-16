module.exports.isUserAuthenticated = (req, res, next) => {
  if (!req.isAuthenticated()) {
    req.session.returnTo = req.originalUrl;
    req.flash("error", "Sign In First !!");
    return res.redirect("/campgrounds/home");
  }
  next();
};
