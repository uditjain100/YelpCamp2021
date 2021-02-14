const express = require("express");
const router = express.Router({ mergeParams: true });

const Campground = require("../models/campground");
const Review = require("../models/review"); // const Campground = require("./models/mongodb.js");

const { reviewSchema } = require("../ulits/validateSchemas");
const catchAsyncError = require("../ulits/CatchAsyncError");
const ExpressError = require("../ulits/ExpressError");

const { isUserAuthenticated, validateReviewSchema } = require("../middleware");

router.post(
  "/",
  isUserAuthenticated,
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

router.delete(
  "/:review_id",
  isUserAuthenticated,
  catchAsyncError(async (req, res) => {
    const { id, review_id } = req.params;
    console.log(id, review_id, req.params);
    await Campground.findByIdAndUpdate(id, { $pull: { reviews: review_id } });
    await Review.findByIdAndDelete(review_id);
    req.flash("del", "Deleted Your Review");
    res.redirect("/campgrounds/" + id);
  })
);

module.exports = router;
