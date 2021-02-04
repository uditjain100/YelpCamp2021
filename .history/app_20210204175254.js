const express = require("express");
const app = express();
const path = require("path");
const mongoose = require("mongoose");
const Campground = require("./models/mongodb.js");

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

app.get("/", async (req, res) => {
  console.log("Heyyyyyyy Home page reached... !!");
  Campground.deleteMany({});
  var camp = new Campground({
    title: "New Orleans",
    price: 25,
    description: "Cold One",
    location: "New Orleans",
  });
  await camp.save();
  var campgrounds = await Campground.find({});
  res.render("campgrounds.ejs", { campgrounds });
});
