const fetch = require("node-fetch");

const imageAPI =
  "https://api.unsplash.com/search/photos?query=nature&client_id=Y2awnZYnoy9IjtXF1lvontb1XRKTfxo8KQ-ubrgADyk";

const getImageURL = async () => {
  return await fetch(imageAPI)
    .then((response) => response.json())
    .then((data) => {
      const allImages = data.results;
      const randomIndex = Math.floor(Math.random() * allImages.length);
      return allImages;
      //   return allImages[randomIndex].url.regular;
    });
};

console.log(getImageURL());
