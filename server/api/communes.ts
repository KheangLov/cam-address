import fs from 'fs';
import path from 'path';

export default defineEventHandler((event) => {
  const filePath = path.resolve(process.cwd(), 'addresses', 'CambodiaCommuneList2023.json')

  try {
    const data = fs.readFileSync(filePath, 'utf-8');
    const communes = JSON.parse(data);

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
