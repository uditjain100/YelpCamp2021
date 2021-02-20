const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Review = require("./review");

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

const imageSchema = new Schema({
  url: String,
  fileName: String,
});

imageSchema.virtual("thumbnail").get(function () {
  return this.url.replace("/upload", "/upload/w_200");
});

const campgroundSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  geometry: {
    type: {
      type: String,
      enum: ["Point"],
      required: true,
    },
    coordinates: {
      type: [Number],
      required: true,
    },
  },
  location: {
    type: String,
  },
  price: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
  },
  images: [imageSchema],
  author: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  reviews: {
    type: [{ type: Schema.Types.ObjectId, ref: "Review" }],
  },
});

campgroundSchema.virtual("properties.popupMarkup").get(function () {
  return this.url.replace("/upload", "/upload/w_200");
});

campgroundSchema.post("findOneAndDelete", async function (doc) {
  if (doc) await Review.deleteMany({ _id: { $in: doc.reviews } });
});

module.exports = mongoose.model("Campground", campgroundSchema);
