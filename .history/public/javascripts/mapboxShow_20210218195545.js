mapboxgl.accessToken = mapToken;
var map = new mapboxgl.Map({
  container: "map", // container ID
  style: "mapbox://styles/mapbox/streets-v11", // style URL
  center: [Number.parseInt("<%  %>"), 40], // starting position [lng, lat]
  zoom: 9, // starting zoom
});
