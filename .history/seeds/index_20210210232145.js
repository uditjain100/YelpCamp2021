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
    console.log("Database got Connected :))");
  })
  .catch((error) => {
    console.log("Oh No ERROR ::(");
    console.log(error);
  });

var ele = (array) => array[Math.floor(Math.random() * array.length)];
var p = () => Math.floor(Math.random() * 30);

var Campground = mongoose.model("Campground", campgroundSchema);

const display = async () => {
  await Campground.deleteMany({});
  var i = 0;
  for (var city of cities) {
    if (i === 10) break;
    i++;
    var c = new Campground({
      title: "" + ele(descriptors.descriptors) + "  " + ele(descriptors.places),
      city: city.city,
      price: p(),
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quo earum quam aperiam quia eum? Provident facere, saepe officiis commodi inventore perspiciatis aliquid itaque id, architecto, tempore neque possimus autem blanditiis!",
      location: "" + city.latitude + " , " + city.longitude,
      img: "https://source.unsplash.com/collection/483251",
    });
    await c.save();
  }
};

// display();
// .then(() => {
//   mongoose.connection.close();
// });

module.exports = Campground;
