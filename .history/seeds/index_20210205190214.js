const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const cities = require("./cities");
const descriptors = require("./seedhelpers");

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
  city: {
    type : String
  }
  price: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
  },
  location: {
    type: String,
  },
  rank: {
    type: Number,
    required: true,
  },
  img: {
    type: String,
  },
});

var ele = (array) => array[Math.floor(Math.random() * array.length)];

var Campground = mongoose.model("Campground", campgroundSchema);

var count = 0;

const display = async () => {
  // await Campground.deleteMany({});
  var i = 0;
  for (var city of cities) {
    if (i === 10) break;
    i++;
    var c = new Campground({
      title: city.city,
      price: 0,
      description:
        "" + ele(descriptors.descriptors) + "  " + ele(descriptors.places),
      location: "" + city.latitude + " , " + city.longitude,
      rank: ++count,
    });
    await c.save();
  }
};

display();
// .then(() => {
//   mongoose.connection.close();
// });

module.exports = Campground;
