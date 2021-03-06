const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const cities = require("./seeds/cities.js");
const descriptors = require('./seeds/descriptors.js')
const places = require('./seeds/places.js')

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

var get = (array) = array[Math.floor(Math.random() * array.length)]

var Campground = mongoose.model("Campground", campgroundSchema);

const display = async () => {
  for(city of cities) {
    var c = new Campground({
      title : city.city,
      price : city.growth_from_2000_to_2013,
      descripion : get(descriptors)
      location = get(places)
    })
  }
}


module.exports = Campground