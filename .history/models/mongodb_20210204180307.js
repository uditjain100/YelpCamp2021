const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const cities = require("./seeds/cities.js");

mongoose
  .connect("mongodb://localhost:27017/yelp-camp", {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Database got Connected :)");
  })
  .catch((error) => {
    console.log("Oh No ERROR ::(");
    console.log(error);
  });

const campgroundSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  descripion: {
    type: String,
  },
  location: {
    type: String,
  },
});

module.exports = mongoose.model("Campground", campgroundSchema);
