module.exports.postReview = async (req, res) => {
  const { id } = req.params;
  const camp = await Campground.findById(id);
  var r = Review(req.body.review);
  r.author = req.user._id;
  camp.reviews.push(r);
  await r.save();
  await camp.save();
  res.redirect("/campgrounds/" + camp._id);
};
