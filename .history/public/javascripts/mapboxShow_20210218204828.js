mapboxgl.accessToken = mapToken;
var map = new mapboxgl.Map({
  container: "map", // container ID
  style: "mapbox://styles/mapbox/streets-v11", // style URL
  center: camp.geometry.coordinates, //[78, 22], // starting position [lng, lat]
  zoom: 9, // starting zoom
});
new mapboxgl.Marker().setLngLat([12.550343, 55.665957]).addTo(map);
