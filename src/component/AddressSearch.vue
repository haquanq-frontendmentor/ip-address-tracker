<script setup lang="ts">
import { storeToRefs } from "pinia";
import { ArrowIcon } from "../assets/images";
import { useGeolocationStore } from "../stores/geolocationStore";

const geolocationStore = useGeolocationStore();
const { address, isError, errorMessage } = storeToRefs(geolocationStore);

const handleSubmit = (e: SubmitEvent) => {
  e.preventDefault();
  geolocationStore.findGeolocation();
};
</script>

<template>
  <div class="flex w-full max-w-138.75 flex-col items-center rounded-[0.875rem] bg-[#d73d3d] shadow-sm">
    <form
      class="flex w-full rounded-[0.875rem] bg-white shadow-xl focus-within:outline-[3px] focus-within:outline-offset-[3px] focus-within:outline-white"
      @submit="handleSubmit"
    >
      <label class="sr-only block grow rounded-[inherit]" for="address-input">
        Search for any IP address or domain
      </label>
      <input
        v-model="address"
        class="h-14.5 w-full rounded-[inherit] px-6 pb-0.5 text-[1.1875rem] leading-6 text-gray-950 outline-none placeholder:text-gray-400"
        id="address-input"
        name="address"
        type="text"
        autocomplete="url"
        placeholder="Search for any IP address or domain"
        :aria-invalid="isError"
        aria-describedby="address-input-hint"
      />
      <button
        class="flex aspect-square h-14.5 items-center justify-center rounded-r-[inherit] bg-gray-950 text-white transition-opacity hover:opacity-75 focus-visible:outline-2 focus-visible:-outline-offset-4 focus-visible:outline-white focus-visible:outline-dotted"
        type="submit"
        aria-label="Search"
      >
        <ArrowIcon />
      </button>
    </form>
    <p
      class="px-6 py-2.5 text-center text-sm leading-5 font-medium text-white"
      id="address-input-hint"
      v-show="isError"
      aria-live="polite"
      aria-atomic="true"
    >
      {{ errorMessage }}
    </p>
  </div>
</template>
