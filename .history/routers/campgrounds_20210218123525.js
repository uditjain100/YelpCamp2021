const express = require("express");
const router = express.Router();
const campController = require("../controllers/campgrounds");
const multer = require("multer");
const { storage } = require("../cloudinary");
const upload = multer({ storage });

const catchAsyncError = require("../ulits/CatchAsyncError");

const {
  isUserAuthenticated,
  validateCampgroundSchema,
  isUserAuthorized,
} = require("../middleware");

router.get("/home", catchAsyncError(campController.home));

router
  .route("/")
  .get(catchAsyncError(campController.getAllCampgrounds))
  .post(
    isUserAuthenticated,
    upload.array("campground[image]"),
    validateCampgroundSchema,
    catchAsyncError(campController.addCamp)
  );

router.get(
  "/add",
  isUserAuthenticated,
  catchAsyncError(campController.renderAddCampground)
);

router
  .route("/:id")
  .get(catchAsyncError(campController.renderCampDetails))
  .put(
    isUserAuthenticated,
    isUserAuthorized,
    upload.array("campground[image]"),
    validateCampgroundSchema,
    catchAsyncError(campController.updateCamp)
  )
  .delete(
    isUserAuthenticated,
    isUserAuthorized,
    catchAsyncError(campController.deleteCamp)
  );

router.get(
  "/:id/update",
  isUserAuthenticated,
  isUserAuthorized,
  catchAsyncError(campController.renderUpdate)
);

module.exports = router;
