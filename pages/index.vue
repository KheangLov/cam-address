<template>
  <div class="d-flex flex-column h-100 overflow-hidden">
    <ProvinceSelect />
    <LeafletMap />
  </div>
</template>

<script setup>
import LeafletMap from '~/components/LeafletMap.vue';
import ProvinceSelect from '~/components/ProvinceSelect.vue';
</script>
