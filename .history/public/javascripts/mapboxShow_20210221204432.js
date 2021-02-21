mapboxgl.accessToken = mapToken;
var map = new mapboxgl.Map({
  container: "map",
  style: "mapbox://styles/mapbox/dark-v10",
  center: campground.geometry.coordinates,
  zoom: 3,
});

// camp.geometry.coordinates
