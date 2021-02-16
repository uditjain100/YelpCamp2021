const express = require("express");
const router = express.Router();
const Campground = require("../models/campground");
const campController = require("../controllers/campgrounds");

const catchAsyncError = require("../ulits/CatchAsyncError");

const {
  isUserAuthenticated,
  validateCampgroundSchema,
  isUserAuthorized,
} = require("../middleware");

router.get("/home", (req, res) => {
  res.render("./campground/home.ejs");
});

router.get("/", catchAsyncError(campController.getAllCampgrounds));

router.get(
  "/add",
  isUserAuthenticated,
  catchAsyncError(campController.renderAddCampground)
);

router.get("/:id", catchAsyncError(campController.renderCampDetails));

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
