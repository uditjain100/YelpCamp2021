const express = require("express");
const router = express.Router();

const Campground = require("./models/campground");
const Review = require("./models/review"); // const Campground = require("./models/mongodb.js");

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
  "/campground/:id/reviews",
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
