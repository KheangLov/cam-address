<template>
  <div class="d-flex flex-column flex-1-1-100 position-relative h-100">
    <div id="map"></div>

    <div class="d-flex justify-space-between align-end w-100 position-absolute d-flex ga-3 pa-3" style="bottom: 0; z-index: 1000;">
      <div class="bg-white pa-2 rounded elevation-1">
        <v-checkbox
          v-model="showBoundaries"
          label="បង្ហាញព្រំដែន"
          density="compact"
          hide-details
        ></v-checkbox>
      </div>
      <!-- <span v-if="address" class="bg-white pa-2 rounded elevation-1">
        {{ address }}
      </span> -->
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue';
import { useStore } from '@/stores/provinceStore';

const address = ref('');
const store = useStore();
const showBoundaries = ref(false);

let flatIcon;
let geojsonLayer;
let marker;
let map;

onMounted(async () => {
  if (import.meta.client) {
    const L = await import('leaflet');
    await import('leaflet/dist/leaflet.css');

    map = L.map('map').setView([11.5564, 104.9282], 13);

    L.tileLayer('http://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}', {
      minZoom: 9,
      maxZoom: 22,
      subdomains: ['mt0', 'mt1', 'mt2', 'mt3']
    }).addTo(map);

    const response = await fetch('/CambodiaCommuneBoundaries.geojson');
    const geojsonData = await response.json();

    geojsonLayer = L.geoJSON(geojsonData, {
      style: () => ({
        color: '#007BFF',
        opacity: showBoundaries.value ? 0.5 : 0,
        fillOpacity: showBoundaries.value ? 0.10 : 0
      })
    }).addTo(map);

    flatIcon = L.icon({
      iconUrl: '/marker.svg',
      iconSize: [38, 38],
      iconAnchor: [19, 38],
      popupAnchor: [0, -38]
    });

    // Define Cambodia's approximate bounds (lat, lon)
    const cambodiaBounds = [[9, 102], [15, 108]]; // Southwest and Northeast corners

    // Set the max bounds for the map (limits the view to Cambodia)
    map.setMaxBounds(cambodiaBounds);

    // Optionally, disable zooming outside the bounds
    map.on('drag', () => {
      map.panInsideBounds(cambodiaBounds);
    });

    map.on('click', async (e) => {
      if (marker) {
        map.removeLayer(marker);
      }
      const latlng = e.latlng;

      marker = L.marker(latlng, { icon: flatIcon }).addTo(map);

      let foundFeature = null;

      geojsonLayer.eachLayer((layer) => {
        if (layer.getBounds().contains(latlng)) {
          foundFeature = layer.feature;
        }
      });

      if (foundFeature) {
        const { ADM1_EN, ADM2_EN, ADM3_EN, ADM3_PCODE } = foundFeature.properties;
        address.value = `ខេត្ត: ${ADM1_EN}, District: ${ADM2_EN}, Commune: ${ADM3_EN}`;

        store.setCode(ADM3_PCODE.replace('KH', ''));
      } else {
        address.value = 'Address not found';
      }
    });

    watch(showBoundaries, (newValue) => {
      geojsonLayer.setStyle({
        opacity: newValue ? 0.5 : 0,
        fillOpacity: newValue ? 0.10 : 0
      });
    });
  }
});

watch(
  () => store.province,
  (newValue) => {
    if (newValue.lat && newValue.lng) {
      if (marker) {
        map.removeLayer(marker);
      }

      const { lat, lng } = newValue;
      marker = L.marker({ lat, lng }, { icon: flatIcon }).addTo(map);
      map.fitBounds(marker.getLatLng().toBounds(500));
    }
  }
);
</script>

<style lang="scss">
#map {
  height: 100%;
}

.leaflet-control-zoom,
.leaflet-control-attribution.leaflet-control {
  display: none;
}
</style>
