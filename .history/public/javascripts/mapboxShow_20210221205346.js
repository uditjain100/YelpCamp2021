mapboxgl.accessToken = mapToken;

const showMap = async () => {
  const point = campground.geometry.coordinates.forEach(
    (element) => element % 80
  );
  var map = new mapboxgl.Map({
    container: "map",
    style: "mapbox://styles/mapbox/dark-v10",
    center: point,
    zoom: 3,
  });
};

showMap();

// camp.geometry.coordinates
