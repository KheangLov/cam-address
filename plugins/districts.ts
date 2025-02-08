export default defineNuxtPlugin(async (nuxtApp) => {
  try {
    const { data, error } = await useFetch('http://localhost:3000/api/districts');
    if (error.value) {
      nuxtApp.provide('districts', []);
    } else {
      nuxtApp.provide('districts', data.value || []);
    }
  } catch (err) {
    nuxtApp.provide('districts', []);
  }
});
