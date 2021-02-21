mapboxgl.accessToken = mapToken;
campground.geometry.coordinates = campground.geometry.coordinates.map(
  (element) => element % 90
);
var map = new mapboxgl.Map({
  container: "map",
  style: "mapbox://styles/mapbox/dark-v10",
  center: campground.geometry.coordinates,
  zoom: 3,
});

new mapboxgl.Marker()
  .setLngLat(campground.geometry.coordinates)
  .setPopup(
    new mapboxgl.Popup({ offset: 25 }).setHTML(
      `<h6> "${campground.title}" </h6>`
    )
  )
  .addTo(map);
