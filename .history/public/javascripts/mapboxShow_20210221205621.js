mapboxgl.accessToken = mapToken;
campground.geometry.coordinates = campground.geometry.coordinates.forEach(
  (element) => element % 90
);
var map = new mapboxgl.Map({
  container: "map",
  style: "mapbox://styles/mapbox/dark-v10",
  center: point,
  zoom: 3,
});

new mapboxgl.Marker()
  .setLngLat(point)
  // .setPopup(new mapboxgl.Popup({ offset: 25 }).setHTML(<h3> "hello" </h3>))
  .addTo(map);
