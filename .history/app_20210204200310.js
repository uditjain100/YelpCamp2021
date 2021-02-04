const express = require("express");
const app = express();
const path = require("path");
const mongoose = require("mongoose");
const Campground = require("./seeds/index.js");
// const Campground = require("./models/mongodb.js");

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

app.listen(3000, () => {
  console.log("Server got started !!");
});

app.get("/campgrounds", async (req, res) => {
  console.log("Heyyyyyyy Home page reached... !!");
  var campgrounds = await Campground.find({});
  res.render("campgrounds.ejs", { campgrounds });
});

app.get("/campgrounds/:id", async (req, res) => {
  var { id } = req.params;
  var camp = await Campground.findById(id);
  res.render("details.ejs", { camp });
});

app.get("/campground/add", (req, res) => {
  res.render("newCamp.ejs");
});

app.post("/campgrounds", async (req, res) => {
  var { title, price, description, latitude, longitude } = req.body;
  var c = new Campground({
    title: title,
    price: price,
    description: description,
    location: "" + latitude + " , " + longitude,
  });
  await c.save();
  res.redirect("campgrounds.ejs");
});
