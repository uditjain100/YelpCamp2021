const Campground = require("../models/campground");
const { cloudinary } = require("../cloudinary/index");
const mapboxGeocoding = require("@mapbox/mapbox-sdk/services/geocoding");
const mapboxToken = process.env.MAPBOX_TOKEN;
const geoCoder = mapboxGeocoding({ accessToken: mapboxToken });

module.exports.home = async (req, res) => {
  return res.render("./campground/home.ejs");
};

module.exports.getAllCampgrounds = async (req, res) => {
  var campgrounds = await Campground.find({});
  return res.render("./campground/campgrounds.ejs", { campgrounds });
};

module.exports.renderAddCampground = async (req, res) => {
  return res.render("./campground/newCamp.ejs");
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
  return res.render("./campground/details.ejs", { camp });
};

module.exports.addCamp = async (req, res, next) => {
  const geoData = await geoCoder
    .forwardGeocode({
      query: req.body.campground.location,
      limit: 1,
    })
    .send();
  var camp = new Campground(req.body.campground);
  camp.geometry = geoData.body.features[0].geometry;
  camp.images = req.files.map((f) => ({ url: f.path, fileName: f.filename }));
  camp.author = req.user._id;
  await camp.save();
  console.log(camp);
  req.flash("success", "Successfully made a Campground");
  return res.redirect("/campgrounds");
};

module.exports.renderUpdate = async (req, res) => {
  var { id } = req.params;
  const camp = await Campground.findById(id);
  return res.render("./campground/update.ejs", { camp });
};

module.exports.updateCamp = async (req, res) => {
  var { id } = req.params;
  const camp = await Campground.findByIdAndUpdate(id, {
    ...req.body.campground,
  });
  var imgs = req.files.map((f) => ({ url: f.path, fileName: f.filename }));
  camp.images.push(...imgs);
  await camp.save();
  if (req.body.tobedeleted) {
    for (var file of req.body.tobedeleted)
      await cloudinary.uploader.destroy(file);
    await camp.updateOne({
      $pull: { images: { fileName: { $in: req.body.tobedeleted } } },
    });
  }
  req.flash("success", "Updated Successfully :)");
  return res.render("./campground/details.ejs", { camp });
};

module.exports.deleteCamp = async (req, res) => {
  var { id } = req.params;
  await Campground.findByIdAndDelete(id);
  req.flash("del", "Deleted Your Review");
  return res.redirect("/campgrounds");
};

module.exports.renderSearch = async (req, res) => {
  const { campName } = req.query;
  const regex = new RegExp(campName, "i");
  Campground.find({ title: regex }).then((campgrounds) => {
    if (!campgrounds.length) req.flash("error", "No results Found");
    return res.render("./campground/campgrounds.ejs", { campgrounds });
  });
};
