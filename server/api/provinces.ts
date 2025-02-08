import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default defineEventHandler((event) => {
  const filePath = path.join(__dirname, '../../public/addresses/CambodiaProvinceList2023.json');
  
  try {
    const data = fs.readFileSync(filePath, 'utf-8');
    const provinces = JSON.parse(data);
    return provinces;
  } catch (error) {
    return {
      error: 'Failed to read JSON file',
      details: error.message
    };
  }
});
