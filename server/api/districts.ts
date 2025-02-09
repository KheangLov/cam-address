export default defineEventHandler(async (event) => {
  try {
    const districts = await $fetch(`${process.env.BASE_URL}/addresses/CambodiaDistrictList2023.json`);

    const query = getQuery(event);
    const { province } = query;

    const filteredDistricts = districts.filter((district) =>
      district.code.padStart(4, '0').substring(0, 2) === province?.toString().padStart(2, '0')
    );

    return filteredDistricts;
  } catch (error) {
    return {
      error: 'Failed to read JSON file',
      details: error.message
    };
  }
});
