import * as XLSX from 'xlsx';
import * as fs from 'fs';

export function readExcel(filePath: string, sheetName?: string): any[] {
    // Leer el archivo Excel
    const workbook = XLSX.readFile(filePath);

    // Obtener la hoja de cálculo (sheet) por nombre o la primera hoja si no se especifica
    const sheet = sheetName ? workbook.Sheets[sheetName] : workbook.Sheets[workbook.SheetNames[0]];

    // Convertir la hoja de cálculo a JSON
    const jsonData = XLSX.utils.sheet_to_json(sheet, { header: 1 });

    // Convertir el array de arrays a un array de objetos
    const headers = jsonData[0] as string[];
    const rows = jsonData.slice(1) as any[][];

    const result = rows.map(row => {
        const obj: any = {};
        headers.forEach((header, index) => {
            obj[header] = row[index];
        });
        return obj;
    });

    return result;
}