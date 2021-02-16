module.exports.getAllCampgrounds = async (req, res) => {
  var campgrounds = await Campground.find({});
  res.render("./campground/campgrounds.ejs", { campgrounds });
};

module.exports.renderAddCampground = async (req, res) => {
  res.render("./campground/newCamp.ejs");
};

module.exports.renderCampDetails = async (req, res) => {
  var { id } = req.params;
  var camp = await Campground.findById(id)
    .populate({
      path: "reviews",
      populate: {
        path: "author",
      },
    })
    .populate("author");
  res.render("./campground/details.ejs", { camp });
};
