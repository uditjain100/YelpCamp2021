const path = require("path");
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const methodoverride = require("method-override");
const ejsMate = require("ejs-mate");

const ExpressError = require("./ulits/ExpressError");

const campgrounds = require("./routers/campgrounds");
const reviews = require("./routers/reviews");

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

app.use("/campgrounds", campgrounds);
app.use("/campgrounds/:id/reviews", reviews);

app.engine("ejs", ejsMate);

app.all("*", (req, res, next) => {
  console.log("*************");
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
