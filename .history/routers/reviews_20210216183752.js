const express = require("express");
const router = express.Router({ mergeParams: true });

const Campground = require("../models/campground");
const Review = require("../models/review"); // const Campground = require("./models/mongodb.js");

const reviewController = require("../controllers/reviews");

const catchAsyncError = require("../ulits/CatchAsyncError");

const {
  isUserAuthenticated,
  validateReviewSchema,
  isReviewUserAuthorized,
} = require("../middleware");

router.post(
  "/",
  isUserAuthenticated,
  validateReviewSchema,
  catchAsyncError(reviewController.postReview)
);

router.delete(
  "/:review_id",
  isUserAuthenticated,
  isReviewUserAuthorized,
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
