const mongoose = require("mongoose");
const Schema = mongoose.Schema;

mongoose
  .connect("mongodb://localhost:27017/yelp-camp", {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Database got Connected :)");
  });

const campgroundSchema = new Schema({
  title: {
    type: String,
    require,
  },
  price: {
    type: Number,
    require,
  },
  descripion: {
    type: String,
  },
  location: {
    type: String,
  },
});

module.exports = mongoose.model("Campground", campgroundSchema);
