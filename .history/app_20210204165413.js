const express = require("express");
const app = express();
const mongoose = require("mongoose");

app.listen(3000, () => {
  console.log("Server Started");
});

app.get("/", async (req, res) => {
  console.log("Heyyyyyyy ... !!");
});
