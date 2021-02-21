mapboxgl.accessToken = mapToken;
console.log(campground.geometry.coordinates);
campground.geometry.coordinates.forEach((element) => element % 90);
console.log(campground.geometry.coordinates);
var map = new mapboxgl.Map({
  container: "map",
  style: "mapbox://styles/mapbox/dark-v10",
  center: campground.geometry.coordinates,
  zoom: 3,
});

new mapboxgl.Marker()
  .setLngLat(campground.geometry.coordinates)
  // .setPopup(new mapboxgl.Popup({ offset: 25 }).setHTML(<h3> "hello" </h3>))
  .addTo(map);
