const express = require("express");
const app = express();
const path = require("path");
const mongoose = require("mongoose");

app.use("views", path.join);

app.listen(3000, () => {
  console.log("Server Started");
});

app.get("/", async (req, res) => {
  console.log("Heyyyyyyy ... !!");
});
