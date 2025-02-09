import fs from 'fs';
import path from 'path';

export default defineEventHandler(() => {
  const filePath = path.resolve(process.cwd(), 'addresses', 'CambodiaProvinceList2023.json');
  console.log(filePath, process.cwd());
  
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
