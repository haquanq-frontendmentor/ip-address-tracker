<script setup lang="ts">
defineProps<{ label: string; value: string }>();
</script>

<template>
  <div class="flex flex-col items-center gap-1.5 sm:gap-3 lg:items-start lg:pl-8">
    <dt class="text-xs leading-4 font-bold tracking-[0.15em] text-gray-400 uppercase">{{ label }}</dt>
    <dd
      class="text-[clamp(1.25rem,0.8922rem+1.5267vw,1.625rem)] leading-[clamp(1.5rem,1.1422rem+1.5267vw,1.875rem)] font-medium tracking-[-0.01em] text-gray-950 lg:w-[80%]"
    >
      {{ value }}
    </dd>
  </div>
</template>
