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

router.get("/home", catchAsyncError(campController.home));

router.route("/")
.get(catchAsyncError(campController.getAllCampgrounds));
.post(
  isUserAuthenticated,
  validateCampgroundSchema,
  catchAsyncError(campController.addCamp)
);

router.get(
  "/add",
  isUserAuthenticated,
  catchAsyncError(campController.renderAddCampground)
);

router.get("/:id", catchAsyncError(campController.renderCampDetails));


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
  catchAsyncError(campController.updateCamp)
);

router.delete(
  "/:id",
  isUserAuthenticated,
  isUserAuthorized,
  catchAsyncError(campController.deleteCamp)
);

module.exports = router;
