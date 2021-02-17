const Campground = require("../models/campground");

module.exports.home = (req, res) => {
  res.render("./campground/home.ejs");
};

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

module.exports.addCamp = async (req, res, next) => {
  var c = new Campground(req.body.campground);
  c.images = req.files.map((f) => ({ url: f.path, fileName: f.filename }));
  c.author = req.user._id;
  await c.save();
  req.flash("success", "Successfully made a Campground");
  res.redirect("/campgrounds");
};

module.exports.renderUpdate = async (req, res) => {
  var { id } = req.params;
  const camp = await Campground.findById(id);
  res.render("./campground/update.ejs", { camp });
};

module.exports.updateCamp = async (req, res) => {
  var { id } = req.params;
  await Campground.findByIdAndUpdate(id, { ...req.body.campground });
  const camp = await Campground.findById(id);
  res.render("./campground/details.ejs", { camp });
};

module.exports.deleteCamp = async (req, res) => {
  var { id } = req.params;
  await Campground.findByIdAndDelete(id);
  req.flash("del", "Deleted Your Review");
  res.redirect("/campgrounds");
};
