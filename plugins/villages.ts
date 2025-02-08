export default defineNuxtPlugin(async (nuxtApp) => {
  try {
    const { data, error } = await useFetch('http://localhost:3000/api/villages');
    if (error.value) {
      nuxtApp.provide('villages', []);
    } else {
      nuxtApp.provide('villages', data.value || []);
    }
  } catch (err) {
    nuxtApp.provide('villages', []);
  }
});
