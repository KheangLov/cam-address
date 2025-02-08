export default defineNuxtPlugin(async (nuxtApp) => {
  try {
    const { data, error } = await useFetch('http://localhost:3000/api/communes');
    if (error.value) {
      nuxtApp.provide('communes', []);
    } else {
      nuxtApp.provide('communes', data.value || []);
    }
  } catch (err) {
    nuxtApp.provide('communes', []);
  }
});
