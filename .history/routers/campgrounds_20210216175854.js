const express = require("express");
const router = express.Router();
const Campground = require("../models/campground");
const campgroundController = require("../controllers/campgrounds");

const catchAsyncError = require("../ulits/CatchAsyncError");

const {
  isUserAuthenticated,
  validateCampgroundSchema,
  isUserAuthorized,
} = require("../middleware");

router.get("/home", (req, res) => {
  res.render("./campground/home.ejs");
});

router.get(
  "/",
  catchAsyncError(async (req, res) => {
    var campgrounds = await Campground.find({});
    res.render("./campground/campgrounds.ejs", { campgrounds });
  })
);

router.get(
  "/add",
  isUserAuthenticated,
  catchAsyncError(async (req, res) => {
    res.render("./campground/newCamp.ejs");
  })
);

router.get(
  "/:id",
  catchAsyncError(async (req, res) => {
    var { id } = req.params;
    var camp = await Campground.findById(id)
      .populate({
        path: "reviews",
        populate: {
          path: "author",
        },
      })
      .populate("author");
    console.log(camp);
    res.render("./campground/details.ejs", { camp });
  })
);

router.post(
  "/",
  isUserAuthenticated,
  validateCampgroundSchema,
  catchAsyncError(async (req, res, next) => {
    var c = new Campground(req.body.campground);
    c.author = req.user._id;
    await c.save();
    req.flash("success", "Successfully made a Campground");
    res.redirect("/campgrounds");
  })
);

router.get(
  "/:id/update",
  isUserAuthenticated,
  isUserAuthorized,
  catchAsyncError(async (req, res) => {
    var { id } = req.params;
    const camp = await Campground.findById(id);
    res.render("./campground/update.ejs", { camp });
  })
);

router.put(
  "/:id",
  validateCampgroundSchema,
  isUserAuthenticated,
  isUserAuthorized,
  catchAsyncError(async (req, res) => {
    var { id } = req.params;
    await Campground.findByIdAndUpdate(id, { ...req.body.campground });
    const camp = await Campground.findById(id);
    res.render("./campground/details.ejs", { camp });
  })
);

router.delete(
  "/:id",
  isUserAuthenticated,
  isUserAuthorized,
  catchAsyncError(async (req, res) => {
    var { id } = req.params;
    await Campground.findByIdAndDelete(id);
    req.flash("del", "Deleted Your Review");
    res.redirect("/campgrounds");
  })
);

module.exports = router;
