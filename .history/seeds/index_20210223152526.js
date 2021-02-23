if (process.env.NODE_ENV !== "production") require("dotenv").config();

const mongoose = require("mongoose");
const Campground = require("../models/campground");
const cities = require("./cities");
const { descriptors, places } = require("./seedhelpers");
const { getImageURL } = require("../RandomImage");

const mongoAtlasURL =
  process.env.MongoDB_URL || "mongodb://localhost:27017/yelp-camp";

console.log("........" + process);

mongoose
  .connect(mongoAtlasURL, {
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

var elementIndex = (array) => Math.floor(Math.random() * array.length);
var price = () => Math.floor(Math.random() * 30);

const display = async () => {
  await Campground.deleteMany({});
  var i = 0;
  for (var city of cities) {
    const index = elementIndex(descriptors);
    // if (i === 1) break;
    console.log(i);
    i++;
    var camp = new Campground({
      title: "" + descriptors[index] + "  " + places[index],
      location: city.city,
      price: price(),
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quo earum quam aperiam quia eum? Provident facere, saepe officiis commodi inventore perspiciatis aliquid itaque id, architecto, tempore neque possimus autem blanditiis!",
      author: "602a7823d388b31578f9a6cc",
      geometry: {
        type: "Point",
        coordinates: [
          city.latitude + price() + price(),
          city.longitude - price() - price(),
        ],
      },
      images: [
        {
          url: await getImageURL(),
          fileName: "YelpCamp/nqc0tldcafcbqz1lw9lj",
        },
        {
          url: await getImageURL(),
          fileName: "YelpCamp/ugnmrxslzunntmmti84i",
        },
      ],
    });
    await camp.save();
  }
};

// display().then(() => {
//   mongoose.connection.close();
// });
