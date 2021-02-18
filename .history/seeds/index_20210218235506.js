const mongoose = require("mongoose");
const Campground = require("../models/campground");
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

var element = (array) => array[Math.floor(Math.random() * array.length)];
var price = () => Math.floor(Math.random() * 30);

const display = async () => {
  await Campground.deleteMany({});
  var i = 0;
  for (var city of cities) {
    if (i === 10) break;
    i++;
    var c = new Campground({
      title:
        "" +
        element(descriptors.descriptors) +
        "  " +
        element(descriptors.places),
      location: city.city,
      price: price(),
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quo earum quam aperiam quia eum? Provident facere, saepe officiis commodi inventore perspiciatis aliquid itaque id, architecto, tempore neque possimus autem blanditiis!",
      author: "602a7823d388b31578f9a6cc",
      geometry: {
        type: "Point",
        coordinates: [78, 22],
      },
      images: [
        {
          url:
            "https://res.cloudinary.com/creasedmeteor/image/upload/v1613630079/YelpCamp/nqc0tldcafcbqz1lw9lj.png",
          fileName: "YelpCamp/nqc0tldcafcbqz1lw9lj",
        },
        {
          url:
            "https://res.cloudinary.com/creasedmeteor/image/upload/v1613630080/YelpCamp/ugnmrxslzunntmmti84i.png",
          fileName: "YelpCamp/ugnmrxslzunntmmti84i",
        },
      ],
    });
    await c.save();
  }
};

display();

// .then(() => {
//   mongoose.connection.close();
// });
