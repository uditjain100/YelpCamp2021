mapboxgl.accessToken = mapToken;
var map = new mapboxgl.Map({
  container: "map", // container ID
  style: "mapbox://styles/mapbox/streets-v11", // style URL
  center: camp.geometry.coordinates, //camp.geometry.coordinates, starting position [lng, lat]
  zoom: 9, // starting zoom
});
new mapboxgl.Marker().setLngLat(camp.geometry.coordinates).addTo(map);
// console.log(camp);
