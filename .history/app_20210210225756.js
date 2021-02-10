const path = require("path");
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Campground = require("./models/mongodb");
const Review = require("./models/review"); // const Campground = require("./models/mongodb.js");
const methodoverride = require("method-override");
const ejsMate = require("ejs-mate");

const { reviewSchema } = require("./ulits/validateSchemas");
const catchAsyncError = require("./ulits/CatchAsyncError");
const ExpressError = require("./ulits/ExpressError");

const campgrounds = require("./routers/campgrounds");

mongoose
  .connect("mongodb://localhost:27017/yelp-camp", {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Database got Connected (:)");
  })
  .catch((error) => {
    console.log("Oh No ERROR ::(");
    console.log(error);
  });

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(express.urlencoded({ extended: true }));
app.use(methodoverride("_method"));

app.engine("ejs", ejsMate);

const validateReviewSchema = (req, res, next) => {
  var validationResult = reviewSchema.validate(req.body);
  if (validationResult.error) {
    const errorMessage = validationResult.error.details
      .map((ele) => ele.message)
      .join(",");
    throw new ExpressError(504, errorMessage);
  } else {
    next();
  }
};

app.use("/campgrounds", campgrounds);

app.post(
  "/campground/:id/reviews",
  validateReviewSchema,
  catchAsyncError(async (req, res) => {
    const { id } = req.params;
    const camp = await Campground.findById(id);
    var r = Review(req.body.review);
    camp.reviews.push(r);
    await r.save();
    await camp.save();
    res.redirect("/campgrounds/" + camp._id);
  })
);

app.all("*", (req, res, next) => {
  next(new ExpressError(404, "Page Not Found :("));
});

app.use((err, req, res, next) => {
  const { statusCode = 500, message = "Something went wrong" } = err;
  console.log(err);
  res.status(statusCode).render("./campground/error.ejs", { err });
});

app.listen(3000, () => {
  console.log("Server got started !!");
});
