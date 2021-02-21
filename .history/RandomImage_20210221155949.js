const fetch = require("node-fetch");

const imageAPI =
  "https://api.unsplash.com/search/photos?query=nature&client_id=Y2awnZYnoy9IjtXF1lvontb1XRKTfxo8KQ-ubrgADyk";

const getImageURL = async () => {
  const data = await fetch(imageAPI);
  const response = await data.json();
  const allImages = await response.results[2];

  return await fetch(imageAPI)
    .then(async (response) => {
      return await response.json();
    })
    .then(async (data) => {
      const allImages = await data.results;
      const randomIndex = Math.floor(Math.random() * allImages.length);
      return allImages;
      //   return allImages[randomIndex].url.regular;
    });
};

console.log(getImageURL());
