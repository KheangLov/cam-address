export default defineEventHandler(async (event) => {
  try {
    const communes = await $fetch(`${process.env.BASE_URL}/addresses/CambodiaCommuneList2023.json`);

    const query = getQuery(event);
    const { district } = query;

    const filteredCommunes = communes.filter((commune) =>
      commune.code.padStart(6, '0').substring(0, 4) === district?.toString().padStart(4, '0')
    );

    return filteredCommunes;
  } catch (error) {
    return {
      error: 'Failed to read JSON file',
      details: error.message
    };
  }
});
