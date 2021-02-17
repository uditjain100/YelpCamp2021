const express = require("express");
const router = express.Router();
const campController = require("../controllers/campgrounds");
const multer = require("multer");
const { storage } = require("../cloudinary/index");
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
  .post(upload.array("campground[image]"), (req, res) => {
    console.log(req.body, req.files);
    return res.send(req.body, req.files);
  });
// .post(
//   isUserAuthenticated,
//   validateCampgroundSchema,
//   catchAsyncError(campController.addCamp)
// );

router.get(
  "/add",
  isUserAuthenticated,
  catchAsyncError(campController.renderAddCampground)
);

router
  .route("/:id")
  .get(catchAsyncError(campController.renderCampDetails))
  .put(
    validateCampgroundSchema,
    isUserAuthenticated,
    isUserAuthorized,
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
