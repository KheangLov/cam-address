export default defineEventHandler(async () => {
  try {
    const provinces = await $fetch(`${process.env.BASE_URL}/addresses/CambodiaProvinceList2023.json`);
    return provinces;
  } catch (error) {
    return {
      error: 'Failed to read JSON file',
      details: error.message
    };
  }
});
