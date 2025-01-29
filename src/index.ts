import { readExcel } from './services/excelService';
import { sendDataToSQL } from './services/sqlService';
import { logInfo, logError } from './utils/logger';
import fs from "fs"

async function main() {
    try {
        const filePath = 'file.xlsx';
        const sheetTableName = 'Plays';

        logInfo('Reading Excel file...');
        const excelData = readExcel(filePath, sheetTableName);

        logInfo('Sending data to SQL Server...');
        await sendDataToSQL(sheetTableName, excelData);

        logInfo('Data sent successfully.');

        fs.writeFileSync("excelData.json", JSON.stringify(excelData, null, 2))
    } catch (error) {
        logError(error);
    }
}

main();