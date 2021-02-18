mapboxgl.accessToken = mapToken;
var map = new mapboxgl.Map({
  container: "map", // container ID
  style: "mapbox://styles/mapbox/streets-v11", // style URL
  center: camp.geometry.coordinates, //camp.geometry.coordinates, starting position [lng, lat]
  zoom: 9, // starting zoom
});
new mapboxgl.Marker()
  .setLngLat(camp.geometry.coordinates)
  .setPopup(new mapboxgl.Popup({ offset: 25 }).setHTML(<h3> "hello" </h3>))
  .addTo(map);
// console.log(camp);
