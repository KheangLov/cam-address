<template>
  <div class="d-flex w-100 justify-content-center pa-3 ga-3 position-absolute" style="z-index: 1000;">
    <v-select
      :items="provinces"
      item-title="name_km"
      item-value="code"
      label="ខេត្ត/ក្រុង"
      v-model="selectedProvince"
      hide-details
      variant="solo-filled"
      class="flex-1-1-100"
    ></v-select>
    <v-select
      :items="districts"
      item-title="name_km"
      item-value="code"
      label="ស្រុក/ខណ្ឌ"
      v-model="selectedDistrict"
      :disabled="!selectedProvince"
      hide-details
      variant="solo-filled"
      class="flex-1-1-100"
    ></v-select>
    <v-select
      :items="communes"
      item-title="name_km"
      item-value="code"
      label="ឃុំ/សង្កាត់"
      v-model="selectedCommune"
      :disabled="!selectedDistrict"
      hide-details
      variant="solo-filled"
      class="flex-1-1-100"
    ></v-select>
    <v-select
      :items="villages"
      item-title="name_km"
      item-value="code"
      label="ភូមិ"
      v-model="selectedVillage"
      :disabled="!selectedCommune"
      hide-details
      variant="solo-filled"
      class="flex-1-1-100"
    ></v-select>
  </div>
</template>

<script setup>
import { useStore } from '@/stores/provinceStore';

const store = useStore();

const provinces = ref([]);
const districts = ref([]);
const communes = ref([]);
const villages = ref([]);

const selectedProvince = ref(null);
const selectedDistrict = ref(null);
const selectedCommune = ref(null);
const selectedVillage = ref(null);

const fetchProvinces = async () => {
  try {
    selectedProvince.value = null;
    const data = await $fetch(`/api/provinces`);
    provinces.value = data;
  } catch (error) {
    console.error('Error fetching districts:', error);
  }
};

const fetchDistricts = async (value) => {
  try {
    selectedDistrict.value = null;
    const data = await $fetch(`/api/districts?province=${value}`);
    districts.value = data;
  } catch (error) {
    console.error('Error fetching districts:', error);
  }
};

const fetchCommunes = async (value) => {
  try {
    selectedCommune.value = null;
    const data = await $fetch(`/api/communes?district=${value}`);
    communes.value = data;
  } catch (error) {
    console.error('Error fetching communes:', error);
  }
};

const fetchVillages = async (value) => {
  try {
    selectedVillage.value = null;
    const data = await $fetch(`/api/villages?commune=${value}`);
    villages.value = data;
  } catch (error) {
    console.error('Error fetching villages:', error);
  }
};

onBeforeMount(async () => {
  await fetchProvinces();
});

let isUpdating = false;

watch(selectedProvince, async (newValue, oldValue) => {
  if (!isUpdating && newValue !== oldValue) {
    const item = provinces.value.find(province => province.code === newValue);
    store.setProvince(item);
    await fetchDistricts(newValue);
  }
});

watch(selectedDistrict, async (newValue, oldValue) => {
  if (!isUpdating && newValue !== oldValue) {
    await fetchCommunes(newValue);
  }
});

watch(selectedCommune, async (newValue, oldValue) => {
  if (!isUpdating && newValue !== oldValue) {
    await fetchVillages(newValue);
  }
});

watch(
  () => store.code,
  async (newValue) => {
    isUpdating = true;

    for (let i = 2; i <= newValue.length; i+=2) {
      const code = Number(newValue.substring(0, i)).toString();
      if (i === 2) {
        selectedProvince.value = code;
        await fetchDistricts(code);
      } else if (i === 4) {
        selectedDistrict.value = code;
        await fetchCommunes(code);
      } else {
        const commune = communes.value.find(commune => commune.code === code);
        if (commune) {
          selectedCommune.value = code;
        }
        await fetchVillages(code);
      }
    }

    isUpdating = false;
  }
);
</script>
