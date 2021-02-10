const express = require("express");
const router = express.Router();

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

app.post(
  "/campgrounds",
  validateCampgroundSchema,
  catchAsyncError(async (req, res, next) => {
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
  validateCampgroundSchema,
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
