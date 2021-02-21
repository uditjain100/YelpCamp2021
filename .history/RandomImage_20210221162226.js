const fetch = require("node-fetch");

const imageAPI =
  "https://api.unsplash.com/search/photos?query=nature&client_id=Y2awnZYnoy9IjtXF1lvontb1XRKTfxo8KQ-ubrgADyk";

module.exports.getImageURL = async () => {
  const data = await fetch(imageAPI);
  const response = await data.json();
  const allImages = await response.results;
  const randomIndex = Math.floor(Math.random() * 5);
  return allImages[randomIndex].urls.regular;
};
