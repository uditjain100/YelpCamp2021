const express = require("express");
const router = express.Router({ mergeParams: true });

const Campground = require("../models/campground");
const Review = require("../models/review"); // const Campground = require("./models/mongodb.js");

const { reviewSchema } = require("../ulits/validateSchemas");
const catchAsyncError = require("../ulits/CatchAsyncError");
const ExpressError = require("../ulits/ExpressError");

const validateReviewSchema = (req, res, next) => {
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

router.post(
  "/",
  validateReviewSchema,
  catchAsyncError(async (req, res) => {
    const { id } = req.params;
    const camp = await Campground.findById(id);
    var r = Review(req.body.review);
    camp.reviews.push(r);
    await r.save();
    await camp.save();
    res.redirect("/campgrounds/" + camp._id);
  })
);

//TODO :
router.delete(
  "/:review_id",
  catchAsyncError(async (req, res) => {
    const { id, review_id } = req.params;
    console.log(id, review_id, req.params);
    await Campground.findByIdAndUpdate(id, { $pull: { reviews: review_id } });
    await Review.findByIdAndDelete(review_id);
    res.redirect("/campgrounds/" + id);
  })
);

module.exports = router;
