const express = require("express");
const router = express.Router();
const Campground = require("../models/campground");

const { campgroundSchema } = require("../ulits/validateSchemas");
const catchAsyncError = require("../ulits/CatchAsyncError");
const ExpressError = require("../ulits/ExpressError");

const {
  isUserAuthenticated,
  validateCampgroundSchema,
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
  isUserAuthenticated,
  catchAsyncError(async (req, res) => {
    var { id } = req.params;
    var camp = await (await Campground.findById(id).populate("reviews").populated("author");
    res.render("./campground/details.ejs", { camp });
  })
);

router.post(
  "/",
  isUserAuthenticated,
  validateCampgroundSchema,
  catchAsyncError(async (req, res, next) => {
    var c = new Campground(req.body.campground);
    await c.save();
    req.flash("success", "Successfully made a Campground");
    res.redirect("/campgrounds");
  })
);

router.get(
  "/:id/update",
  isUserAuthenticated,
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
  catchAsyncError(async (req, res) => {
    var { id } = req.params;
    await Campground.findByIdAndDelete(id);
    req.flash("del", "Deleted Your Review");
    res.redirect("/campgrounds");
  })
);

module.exports = router;
