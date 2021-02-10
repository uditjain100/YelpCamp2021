const express = require("express");
const router = express.Router();
const Campground = require("../models/campground");
const methodoverride = require("method-override");

const { campgroundSchema } = require("../ulits/validateSchemas");
const catchAsyncError = require("../ulits/CatchAsyncError");
const ExpressError = require("../ulits/ExpressError");

const validateCampgroundSchema = (req, res, next) => {
  var validationResult = campgroundSchema.validate(req.body);
  if (validationResult.error) {
    const errorMessage = validationResult.error.details
      .map((ele) => ele.message)
      .join(",");
    throw new ExpressError(504, errorMessage);
  } else {
    next();
  }
};

router.use(methodoverride("_method"));

router.get("/home", (req, res) => {
  res.render("./campground/home.ejs");
});

router.get(
  "/",
  catchAsyncError(async (req, res) => {
    console.log("Heyyyyyyy Home page reached... !!");
    var campgrounds = await Campground.find({});
    res.render("./campground/campgrounds.ejs", { campgrounds });
  })
);

router.get(
  "/add",
  catchAsyncError(async (req, res) => {
    res.render("./campground/newCamp.ejs");
  })
);

router.get(
  "/:id",
  catchAsyncError(async (req, res) => {
    var { id } = req.params;
    var camp = await Campground.findById(id).populate("reviews");
    res.render("./campground/details.ejs", { camp });
  })
);

router.post(
  "/",
  validateCampgroundSchema,
  catchAsyncError(async (req, res, next) => {
    var c = new Campground(req.body.campground);
    await c.save();
    res.redirect("/campgrounds");
  })
);

router.get(
  "/:id/update",
  catchAsyncError(async (req, res) => {
    var { id } = req.params;
    const camp = await Campground.findById(id);
    res.render("./campground/update.ejs", { camp });
  })
);

router.put(
  "/:id",
  validateCampgroundSchema,
  catchAsyncError(async (req, res) => {
    var { id } = req.params;
    const camp = await Campground.findById(id);
    await Campground.findByIdAndUpdate(id, { ...req.body });
    camp = await Campground.findById(id);
    console.log(camp);
    res.render("./campground/details.ejs", { camp });
  })
);

router.delete(
  "/:id",
  catchAsyncError(async (req, res) => {
    var { id } = req.params;
    await Campground.findByIdAndDelete(id);
    var campgrounds = await Campground.find({});
    res.render("./campground/campgrounds.ejs", { campgrounds });
  })
);

module.exports = router;
