<script setup lang="ts">
import { storeToRefs } from "pinia";
import { computed } from "vue";
import { useGeolocationStore } from "../../stores/geolocationStore";
import ResultItem from "./ResultItem.vue";

const geolocationStore = useGeolocationStore();
const { geolocation } = storeToRefs(geolocationStore);

const ip = computed(() => {
  if (geolocation.value) {
    return geolocation.value.query;
  }
  return "192.212.174.101";
});

const location = computed(() => {
  if (geolocation.value) {
    return [geolocation.value.city, geolocation.value.regionName].join(", ");
  }
  return "Brooklyn, NY 10001";
});

const timezone = computed(() => {
  if (geolocation.value) {
    const formatter = new Intl.DateTimeFormat("en-US", {
      timeZone: geolocation.value.timezone,
      timeZoneName: "longOffset",
    });
    const currentDate = formatter.format(new Date());
    return "UTC " + currentDate.match(/GMT([+-]\d{2,2}:\d{2,2})/)?.[1];
  }
  return "Brooklyn, NY 10001";
});

const isp = computed(() => {
  if (geolocation.value) {
    return geolocation.value.isp;
  }
  return "SpaceX Starlink";
});
</script>

<template>
  <dl
    class="grid justify-center gap-y-4 pt-[clamp(1.5rem,0.7844rem+3.0534vw,2.25rem)] pb-[clamp(1.5rem,0.7247rem+3.3079vw,2.3125rem)] text-center sm:grid-cols-2 sm:gap-y-8 lg:grid-cols-4 lg:divide-x lg:divide-gray-400 lg:text-start"
  >
    <ResultItem label="IP address" :value="ip" />
    <ResultItem label="Location" :value="location" />
    <ResultItem label="Timezone" :value="timezone" />
    <ResultItem label="Isp" :value="isp" />
  </dl>
</template>
