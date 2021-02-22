const { campgroundSchema } = require("./ulits/validateSchemas");
const { reviewSchema } = require("./ulits/validateSchemas");
const Campground = require("./models/campground");
const Review = require("./models/review");
const ExpressError = require("./ulits/ExpressError");

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

module.exports.isReviewUserAuthorized = async (req, res, next) => {
  const { review_id, id } = req.params;
  const review = await Review.findById(review_id);
  if (!review.author.equals(req.user._id)) {
    req.flash("error", "You are not authorized to do that operation");
    return res.redirect("/campgrounds/" + id);
  }
  next();
};

module.exports.isUserAuthenticated = (req, res, next) => {
  if (!req.isAuthenticated()) {
    req.session.returnTo = req.originalUrl;
    req.flash("error", "Sign In First !!");
    return res.redirect("/campgrounds/signin");
  }
  next();
};
