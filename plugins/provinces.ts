export default defineNuxtPlugin(async (nuxtApp) => {
  try {
    const { data, error } = await useFetch('http://localhost:3000/api/provinces');
    if (error.value) {
      nuxtApp.provide('provinces', []);
    } else {
      nuxtApp.provide('provinces', data.value || []);
    }
  } catch (err) {
    nuxtApp.provide('provinces', []);
  }
});
