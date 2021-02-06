const path = require("path");
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Campground = require("./seeds/index.js"); // const Campground = require("./models/mongodb.js");
const methodoverride = require("method-override");
const ejsMate = require("ejs-mate");
const Joi = require("joi");

const catchAsyncError = require("./ulits/CatchAsyncError");
const ExpressError = require("./ulits/ExpressError");

mongoose
  .connect("mongodb://localhost:27017/yelp-camp", {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Database got Connected :)");
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

app.get(
  "/campgrounds",
  catchAsyncError(async (req, res) => {
    console.log("Heyyyyyyy Home page reached... !!");
    var campgrounds = await Campground.find({});
    res.render("campgrounds.ejs", { campgrounds });
  })
);

app.get(
  "/campgrounds/:id",
  catchAsyncError(async (req, res) => {
    var { id } = req.params;
    var camp = await Campground.findById(id);
    res.render("details.ejs", { camp });
  })
);

app.get(
  "/campground/add",
  catchAsyncError((req, res) => {
    res.render("newCamp.ejs");
  })
);

app.post(
  "/campgrounds",
  catchAsyncError(async (req, res, next) => {
    // if (!req.body.Campground)
    //   throw new ExpressError(400, "Invalid Campground Data");
    var campgroundSchema = Joi.object({
      campground: Joi.object({
        title: Joi.string().required(),
        price: Joi.number().required().min(0),
        city: Joi.string().required(),
        description: Joi.string().required(),
        img: Joi.string().required(),
        latitude: Joi.number().required(),
        longitude: Joi.number().required(),
      }).required(),
    });
    var validationResult = campgroundSchema.validate(req.body);
    if (validationResult.error) {
      const errorMessage = validationResult.error.details
        .map((ele) => ele.message)
        .join(",");
      throw new ExpressError(504, errorMessage);
    }
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
    res.render("update.ejs", { camp });
  })
);

app.patch(
  "/campground/:id",
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
    res.render("details.ejs", { camp });
  })
);

app.delete(
  "/campground/:id",
  catchAsyncError(async (req, res) => {
    var { id } = req.params;
    await Campground.findByIdAndDelete(id);
    var campgrounds = await Campground.find({});
    res.render("campgrounds.ejs", { campgrounds });
  })
);

app.all("*", (req, res, next) => {
  next(new ExpressError(404, "Page Not Found :("));
});

app.use((err, req, res, next) => {
  const { status = 500 } = err;
  if (!err.message) err.message = "Something went wrong";
  res.status(status).render("error.ejs", { err });
});

app.listen(3000, () => {
  console.log("Server got started !!");
});
