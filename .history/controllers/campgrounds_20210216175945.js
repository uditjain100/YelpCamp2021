module.exports.getAllCampgrounds = async (req, res) => {
  var campgrounds = await Campground.find({});
  res.render("./campground/campgrounds.ejs", { campgrounds });
};
