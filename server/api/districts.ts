import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default defineEventHandler((event) => {
  const filePath = path.join(__dirname, '../../addresses/CambodiaDistrictList2023.json');
  
  try {
    const data = fs.readFileSync(filePath, 'utf-8');
    const districts = JSON.parse(data);

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
