mapboxgl.accessToken = mapToken;
var map = new mapboxgl.Map({
  container: "map",
  style: "mapbox://styles/mapbox/light-v10",
  center: [-103.59179687498357, 40.66995747013945],
  zoom: 3,
});

map.on("load", function () {
  map.addSource("campgrounds", {
    type: "geojson",
    data: allCampgrounds, //"https://docs.mapbox.com/mapbox-gl-js/assets/earthquakes.geojson",
    cluster: true,
    clusterMaxZoom: 14, // Max zoom to cluster points on
    clusterRadius: 50, // Radius of each cluster when clustering points (defaults to 50)
  });

  map.addLayer({
    id: "clusters",
    type: "circle",
    source: "campgrounds",
    filter: ["has", "point_count"],
    paint: {
      "circle-color": [
        "step",
        ["get", "point_count"],
        "red",
        10,
        "orange",
        40,
        "blue",
      ],
      "circle-radius": ["step", ["get", "point_count"], 20, 10, 30, 70, 40],
    },
  });

  map.addLayer({
    id: "cluster-count",
    type: "symbol",
    source: "campgrounds",
    filter: ["has", "point_count"],
    layout: {
      "text-field": "{point_count_abbreviated}",
      "text-font": ["DIN Offc Pro Medium", "Arial Unicode MS Bold"],
      "text-size": 12,
    },
  });

  map.addLayer({
    id: "unclustered-point",
    type: "circle",
    source: "campgrounds",
    filter: ["!", ["has", "point_count"]],
    paint: {
      "circle-color": "#11b4da",
      "circle-radius": 4,
      "circle-stroke-width": 1,
      "circle-stroke-color": "#fff",
    },
  });

  // inspect a cluster on click
  map.on("click", "clusters", function (e) {
    var features = map.queryRenderedFeatures(e.point, {
      layers: ["clusters"],
    });
    var clusterId = features[0].properties.cluster_id;
    map
      .getSource("campgrounds")
      .getClusterExpansionZoom(clusterId, function (err, zoom) {
        if (err) return;

        map.easeTo({
          center: features[0].geometry.coordinates,
          zoom: zoom,
        });
      });
  });

  map.on("click", "unclustered-point", function (e) {
    var coordinates = e.features[0].geometry.coordinates.slice();
    var mag = e.features[0].properties.mag;
    var tsunami;

    if (e.features[0].properties.tsunami === 1) {
      tsunami = "yes";
    } else {
      tsunami = "no";
    }

    while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
      coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
    }

    new mapboxgl.Popup().setLngLat(coordinates).setHTML("<h3>"Camp"</h3>").addTo(map);
  });

  map.on("mouseenter", "clusters", function () {
    map.getCanvas().style.cursor = "pointer";
  });
  map.on("mouseleave", "clusters", function () {
    map.getCanvas().style.cursor = "";
  });
});
