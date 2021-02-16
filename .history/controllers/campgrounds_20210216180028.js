module.exports.getAllCampgrounds = async (req, res) => {
  var campgrounds = await Campground.find({});
  res.render("./campground/campgrounds.ejs", { campgrounds });
};

module.exports = async (req, res) => {
  res.render("./campground/newCamp.ejs");
};
