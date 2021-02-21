const imageAPI =
  "https://api.unsplash.com/search/photos?query=nature&client_id=Y2awnZYnoy9IjtXF1lvontb1XRKTfxo8KQ-ubrgADyk";

const getImageURL = async () => {
  return fetch(imageAPI)
    .then((response) => response.json())
    .then((data) => {
      const allImages = data.results;
      const random = Math.floor(Math.random() * 100);
    });
};
