import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default defineEventHandler((event) => {
  const filePath = path.join(__dirname, '../../public/addresses/CambodiaVillagesList2023.json');
  
  try {
    const data = fs.readFileSync(filePath, 'utf-8');
    const villages = JSON.parse(data);

    const query = getQuery(event);
    const { commune } = query;

    const filteredVillages = villages.filter((village) =>
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
