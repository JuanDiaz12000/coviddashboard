<template>
    <div id="map"></div>
</template>

<script>
import mapboxgl from 'mapbox-gl';
import UnitedStates from '../components/unitedStates.geojson'
export default {
 name: "Covid2",
  mounted() {
      let hoveredStateId = null;
      mapboxgl.accessToken = "pk.eyJ1IjoianVhbmRpYXpuMTIiLCJhIjoiY2t0eDJmeTRvMnBuaDJucDlqc3p0djU5bSJ9.jLvuW19MDDFc8lEnbs1xew";
    const map = new mapboxgl.Map({
      container: "map",
      style: "mapbox://styles/mapbox/navigation-night-v1",
      center: [-100.562938, 38.4816921],
      zoom: 4,
    });
    map.on('load', () => {
    map.addSource('states', {
    'type': 'geojson',
    'data': UnitedStates
    });
    
    // The feature-state dependent fill-opacity expression will render the hover effect
    // when a feature's hover state is set to true.
    map.addLayer({
    'id': 'state-fills',
    'type': 'fill',
    'source': 'states',
    'layout': {},
    'paint': {
    "fill-color": '#FF5252',
          "fill-opacity": [
              'case',
              ['boolean', ['feature-state', 'hover'], false],
              1,
              0.75
          ],
          // 0.75,
          "fill-outline-color": '#FAFAFA',
    }
    });
    
  })
  map.on('mousemove', 'state-fills', (e) => {
if (e.features.length > 0) {
    console.log(e.features[0].id)
if (hoveredStateId !== null) {
map.setFeatureState(
{ source: 'states', id: hoveredStateId },
{ hover: false }
);
}
hoveredStateId = e.features[0].id;
map.setFeatureState(
{ source: 'states', id: hoveredStateId },
{ hover: true }
);
}
});
 
// When the mouse leaves the state-fill layer, update the feature state of the
// previously hovered feature.
map.on('mouseleave', 'state-fills', () => {
if (hoveredStateId !== null) {
map.setFeatureState(
{ source: 'states', id: hoveredStateId },
{ hover: false }
);
}
hoveredStateId = null;
});
const popup = new mapboxgl.Popup({
closeButton: false,
closeOnClick: false,
offset: [0, 15]
});
map.on('mousemove', 'state-fills', (e) => {
// Change the cursor style as a UI indicator.
map.getCanvas().style.cursor = 'pointer';
// Copy coordinates array.
const description = e.features[0].properties.NAME;
console.log(description)
popup.setLngLat(e.lngLat).setHTML('<div id="popper"><h1>'+description+'</h1><br><h3>Confirmados: '+e.features[0].properties.Confirmed+'</h3><br><h3>Decesos: '+e.features[0].properties.Death+'</h3></div>').addTo(map);
popup.update();
});
map.on('mouseleave', 'state-fills', () => {
map.getCanvas().style.cursor = '';
popup.update();
popup.remove();
});

},}
</script>

