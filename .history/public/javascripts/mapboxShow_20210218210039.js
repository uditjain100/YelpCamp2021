mapboxgl.accessToken = mapToken;
var map = new mapboxgl.Map({
  container: "map", // container ID
  style: "mapbox://styles/mapbox/streets-v11", // style URL
  center: [78, 22], //camp.geometry.coordinates, starting position [lng, lat]
  zoom: 9, // starting zoom
});
new mapboxgl.Marker().setLngLat([78, 22]).addTo(map);
// camp.geometry.coordinates
console.log(camp);
