const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Review = require("./review")

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

const campgroundSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  city: {
    type: String,
  },
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
  img: {
    type: String,
    default: "https://source.unsplash.com/collection/483251",
  },
  reviews: {
    type: [{ type: Schema.Types.ObjectId, ref: "Review" }],
  },
});

campgroundSchema.post("findOneAndDelete", async function (doc) => {
  if(doc) {
    await Review
  }
})

module.exports = mongoose.model("Campground", campgroundSchema);
