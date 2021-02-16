const { campgroundSchema } = require("./ulits/validateSchemas");
const { reviewSchema } = require("./ulits/validateSchemas");

module.exports.isUserAuthenticated = (req, res, next) => {
  if (!req.isAuthenticated()) {
    req.session.returnTo = req.originalUrl;
    req.flash("error", "Sign In First !!");
    return res.redirect("/campgrounds/home");
  }
  next();
};

module.exports.validateCampgroundSchema = (req, res, next) => {
  var validationResult = campgroundSchema.validate(req.body);
  if (validationResult.error) {
    const errorMessage = validationResult.error.details
      .map((ele) => ele.message)
      .join(",");
    throw new ExpressError(504, errorMessage);
  } else {
    next();
  }
};

module.exports.validateReviewSchema = (req, res, next) => {
  var validationResult = reviewSchema.validate(req.body);
  if (validationResult.error) {
    const errorMessage = validationResult.error.details
      .map((ele) => ele.message)
      .join(",");
    throw new ExpressError(504, errorMessage);
  } else {
    next();
  }
};

module.exports.isUserAuthorized = async (req, res, next) => {
  const { id } = req.params;
  const camp = await Campground.findById(id);
  if (!camp.author.equals(req.user._id)) {
    req.flash("error", "You are not authorized to do that operation");
    return res.redirect("/campgrounds/" + id);
  }
  next();
};
