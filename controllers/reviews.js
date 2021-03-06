const Campground = require("../models/campground");
const Review = require("../models/review"); // const Campground = require("./models/mongodb.js");

module.exports.postReview = async (req, res) => {
  const { id } = req.params;
  const camp = await Campground.findById(id);
  var r = Review(req.body.review);
  r.author = req.user._id;
  camp.reviews.push(r);
  await r.save();
  await camp.save();
  return res.redirect("/campgrounds/" + camp._id);
};

module.exports.deleteReview = async (req, res) => {
  const { id, review_id } = req.params;
  console.log(id, review_id, req.params);
  await Campground.findByIdAndUpdate(id, { $pull: { reviews: review_id } });
  await Review.findByIdAndDelete(review_id);
  req.flash("del", "Deleted Your Review");
  return res.redirect("/campgrounds/" + id);
};
