const path = require("path");
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Campground = require("./models/mongodb");
const Review = require("./models/review"); // const Campground = require("./models/mongodb.js");
const methodoverride = require("method-override");
const ejsMate = require("ejs-mate");

const { campgroundSchema, reviewSchema } = require("./ulits/validateSchemas");
const catchAsyncError = require("./ulits/CatchAsyncError");
const ExpressError = require("./ulits/ExpressError");

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

app.post(
  "/campground/:id/reviews",
  catchAsyncError(async (req, res) => {
    const { id } = req.params;
    const camp = await Campground.findById(id);
    var r = Review(req.body.review);
    console.log("R : " + r);
    camp.reviews.push(r);
    await r.save();
    await camp.save();
    res.redirect("/campgrounds/" + camp._id);
  })
);

app.get(
  "/campgrounds",
  catchAsyncError(async (req, res) => {
    console.log("Heyyyyyyy Home page reached... !!");
    var campgrounds = await Campground.find({});
    res.render("./campground/campgrounds.ejs", { campgrounds });
  })
);

app.get(
  "/campgrounds/:id",
  catchAsyncError(async (req, res) => {
    var { id } = req.params;
    var camp = await Campground.findById(id).populate("reviews");
    res.render("./campground/details.ejs", { camp });
  })
);

app.get(
  "/campground/add",
  catchAsyncError(async (req, res) => {
    res.render("./campground/newCamp.ejs");
  })
);

const validateSchema = (req, res, next) => {
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

app.post(
  "/campgrounds",
  validateSchema,
  catchAsyncError(async (req, res, next) => {
    // if (!req.body.Campground)
    //   throw new ExpressError(400, "Invalid Campground Data");
    // var {
    //   title,
    //   price,
    //   city,
    //   description,
    //   img,
    //   latitude,
    //   longitude,
    // } = req.body;
    // var c = new Campground({
    //   title: title,
    //   price: price,
    //   city: city,
    //   description: description,
    //   location: "" + latitude + " , " + longitude,
    //   rank: ++len,
    //   img: img,
    // });
    var c = new Campground(req.body.campground);
    await c.save();
    res.redirect("/campgrounds");
  })
);

app.get(
  "/campgrounds/:id/update",
  catchAsyncError(async (req, res) => {
    var { id } = req.params;
    const camp = await Campground.findById(id);
    res.render("./campground/update.ejs", { camp });
  })
);

app.patch(
  "/campground/:id",
  validateSchema,
  catchAsyncError(async (req, res) => {
    var { id } = req.params;
    var { title, price, description, latitude, longitude } = req.body;
    await Campground.findByIdAndUpdate(id, {
      title: title,
      price: price,
      description: description,
      location: "" + latitude + " , " + longitude,
    });
    const camp = await Campground.findById(id);
    res.render("./campground/details.ejs", { camp });
  })
);

app.delete(
  "/campground/:id",
  catchAsyncError(async (req, res) => {
    var { id } = req.params;
    await Campground.findByIdAndDelete(id);
    var campgrounds = await Campground.find({});
    res.render("./campground/campgrounds.ejs", { campgrounds });
  })
);

app.all("*", (req, res, next) => {
  next(new ExpressError(404, "Page Not Found :("));
});

app.use((err, req, res, next) => {
  const { statusCode = 500, message = "Something went wrong" } = err;
  res.status(statusCode).render("./campground/error.ejs", { err });
});

app.listen(3000, () => {
  console.log("Server got started !!");
});
