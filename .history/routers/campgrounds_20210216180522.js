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
  catchAsyncError(campController.addCamp)
);

router.get(
  "/:id/update",
  isUserAuthenticated,
  isUserAuthorized,
  catchAsyncError(campController.renderUpdate)
);

router.put(
  "/:id",
  validateCampgroundSchema,
  isUserAuthenticated,
  isUserAuthorized,
  catchAsyncError(campController.updatCamp)
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
