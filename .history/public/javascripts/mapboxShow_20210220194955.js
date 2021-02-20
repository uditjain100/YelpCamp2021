mapboxgl.accessToken = mapToken;
console.log(mapToken);
var map = new mapboxgl.Map({
  container: "map", // container ID
  style: "mapbox://styles/mapbox/streets-v11", // style URL
  center: [100, 100], //camp.geometry.coordinates, starting position [lng, lat]
  zoom: 9, // starting zoom
});
