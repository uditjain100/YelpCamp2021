const express = require("express");
const app = express();
const path = require("path");
const mongoose = require("mongoose");

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.listen(3000, () => {
  console.log("Server Started");
});

app.get("/", async (req, res) => {
  console.log("Heyyyyyyy ... !!");
  res.render("campgrounds.ejs");
});
