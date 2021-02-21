mapboxgl.accessToken = mapToken;

const point = campground.geometry.coordinates.forEach(
  (element) => element % 90
);
var map = new mapboxgl.Map({
  container: "map",
  style: "mapbox://styles/mapbox/dark-v10",
  center: point,
  zoom: 3,
});

// camp.geometry.coordinates
