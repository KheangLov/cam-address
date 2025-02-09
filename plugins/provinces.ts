export default defineNuxtPlugin(async (nuxtApp) => {
  const { data } = await useFetch('http://localhost:3000/api/provinces');
  console.log({ data })
  nuxtApp.provide('provinces', data.value);
});
