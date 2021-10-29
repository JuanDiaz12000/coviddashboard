<template>
<MglMap 
    ref="map" container="myAwesomeMap" :center.sync="center" :accessToken="accessToken"  :mapStyle="mapStyle" :zoom.sync="zoom">

    <MglGeojsonLayer
      type="fill"
      :sourceId="geoJsonSource.data.id"
      :layerId="geoJsonLayer.id"
      :layer="geoJsonLayer"
      :source="geoJsonSource"
      @click="handleClick"
    />
    <MglPopup :coordinates="markerCoordinates" anchor="top" :closeOnClick="closeOnClick">
      <VCard> <div>Hello, I'm popup!</div> </VCard>
    </MglPopup>
  </MglMap>
</template>

<script>

import {MglMap, MglGeojsonLayer, MglPopup} from '../../node_modules/vue-mapbox'
import UnitedStates from '../components/unitedStates.geojson'

export default {

  name: 'Covid2',
  components: {
    MglMap,
    //MglMarker,
    MglGeojsonLayer,
    MglPopup
  },

  data () {
      return{
      accessToken: 'pk.eyJ1IjoianVhbmRpYXpuMTIiLCJhIjoiY2t0eDJmeTRvMnBuaDJucDlqc3p0djU5bSJ9.jLvuW19MDDFc8lEnbs1xew',
      mapStyle: 'mapbox://styles/mapbox/dark-v10',//'mapbox://styles/mapbox/navigation-night-v1',//'mapbox://styles/examples/cjgioozof002u2sr5k7t14dim',
      handleClick: function(event) {
      console.log("Nombre de Estado: "+event.mapboxEvent.features[0].properties.NAME+", Número de casos: "+event.mapboxEvent.features[0].properties.Confirmed + ", Número de Muertes: "+event.mapboxEvent.features[0].properties.Death);
      //event.mapboxEvent.MglPopup.
      },
      /*closeOnClick: function(event)
      {

      },*/
      markerCoordinates: [-100.562938, 38.4816921],
      center: [-100.562938, 38.4816921],
      zoom: 4,
      geoJsonSource: 
      {
        type: 'geojson',
        data: UnitedStates
      }, 
      geoJsonLayer: {
        id: "geoJsonFill",
        type: "fill",
        paint: {
          "fill-color": '#FF5252',
          "fill-opacity": 0.75,
          "fill-outline-color": '#FAFAFA',
        },          
      },
};
},
};
</script>

<style>
#myAwesomeMap{
  height: 500px;
  width: 100%;
}
</style>
