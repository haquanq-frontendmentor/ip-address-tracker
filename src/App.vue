<script setup lang="ts">
import * as L from "leaflet";
import { storeToRefs } from "pinia";
import { onMounted, ref, useTemplateRef, watch } from "vue";
import { BackgroundPatternDesktop, BackgroundPatternMobile } from "./assets/images";
import AddressSearch from "./component/AddressSearch.vue";
import Result from "./component/Result/Result.vue";
import { getUserIPAddress } from "./services/getUserIPAddress";
import { useGeolocationStore } from "./stores/geolocationStore";

const map = ref<L.Map | null>(null);
const mapRef = useTemplateRef("map");
const mapMarker = ref<L.Marker | null>(null);

const locationMarker = L.divIcon({
  className: "bg-transparent",
  html: `<svg xmlns="http://www.w3.org/2000/svg" width="46" height="56"><path fill-rule="evenodd" fill="#d73d3d" d="M39.263 7.673c8.897 8.812 8.966 23.168.153 32.065l-.153.153L23 56 6.737 39.89C-2.16 31.079-2.23 16.723 6.584 7.826l.153-.152c9.007-8.922 23.52-8.922 32.526 0zM23 14.435c-5.211 0-9.436 4.185-9.436 9.347S17.79 33.128 23 33.128s9.436-4.184 9.436-9.346S28.21 14.435 23 14.435z"/></svg>`,
  iconSize: [46, 56],
  iconAnchor: [26, 56],
});

const geolocationStore = useGeolocationStore();
const { geolocation } = storeToRefs(geolocationStore);

onMounted(() => {
  if (!mapRef.value) return;
  map.value = L.map(mapRef.value, {
    center: [51.505, -0.09],
    zoom: 13,
    zoomControl: false,
    attributionControl: false,
  });

  getUserIPAddress().then((data) => {
    geolocationStore.findGeolocation(data.ip);
  });
});

watch(map, (v) => {
  if (v !== null) {
    L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
      maxZoom: 19,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    }).addTo(v as L.Map);
  }
});

watch(geolocation, (geolocation) => {
  if (geolocation && map.value) {
    if (mapMarker.value) map.value.removeLayer(mapMarker.value as L.Marker);
    mapMarker.value = L.marker([geolocation.lat, geolocation.lon], { icon: locationMarker }).addTo(map.value as L.Map);
    map.value.zoomIn(3);
    map.value.flyTo([geolocation.lat, geolocation.lon]);
  }
});
</script>

<template>
  <main class="relative">
    <div class="absolute inset-x-0 top-0 z-999 mx-auto flex w-[min(100vw-3rem,69.375rem)] flex-col items-center pt-8">
      <h1
        class="mb-7.5 text-[clamp(1.625rem,1.2672rem+1.5267vw,2rem)] font-medium tracking-[-0.01em] text-white capitalize"
      >
        IP address tracker
      </h1>
      <div class="flex w-full flex-col items-center gap-[clamp(1.5rem,0.0687rem+6.1069vw,3rem)]">
        <AddressSearch />
        <Result />
      </div>
    </div>
    <div class="h-70 select-none *:h-full *:w-full *:object-cover">
      <img class="md:hidden" :src="BackgroundPatternMobile" alt="" />
      <img class="hidden md:block" :src="BackgroundPatternDesktop" alt="" />
    </div>
    <div ref="map" class="z-100 h-[calc(100vh-17.5rem)]"></div>
  </main>
</template>
