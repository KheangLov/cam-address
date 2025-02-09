export default defineEventHandler(async (event) => {
  try {
    const villages = await $fetch(`${process.env.BASE_URL}/addresses/CambodiaVillagesList2023.json`);

    const query = getQuery(event);
    const { commune } = query;

    const filteredVillages = villages?.filter((village) =>
      village.code.padStart(8, '0').substring(0, 6) === commune?.toString().padStart(6, '0')
    );

    return filteredVillages;
  } catch (error) {
    return {
      error: 'Failed to read JSON file',
      details: error.message
    };
  }
});
