const express = require("express");
const app = express();
const path = require("path");
const mongoose = require("mongoose");

app.use("view-engine", "ejs");
app.use("views", path.join(__dirname, "views"));

app.listen(3000, () => {
  console.log("Server Started");
});

app.get("/", async (req, res) => {
  console.log("Heyyyyyyy ... !!");
});
