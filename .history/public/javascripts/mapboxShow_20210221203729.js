mapboxgl.accessToken = mapToken;
var map = new mapboxgl.Map({
  container: "map",
  style: "mapbox://styles/mapbox/dark-v10",
  center: [-103.59179687498357, 40.66995747013945],
  zoom: 3,
});

new mapboxgl.Marker()
  .setLngLat([100, 100])
  // .setPopup(new mapboxgl.Popup({ offset: 25 }).setHTML(<h3> "hello" </h3>))
  .addTo(map);
// console.log(camp);
