import * as sql from 'mssql';
import dbConfig from '../config/dbConfig'

export async function sendDataToSQL(tableName: string, data: any[]): Promise<void> {
    const pool = await new sql.ConnectionPool(dbConfig).connect();

    for (const row of data) {
        const columns = Object.keys(row).join(', ');
        const values = Object.values(row).map(value => value === undefined ? 'NULL' : (typeof value === 'number' ? value : `'${value}'`)).join(', ');
        
        const query = `INSERT INTO ${tableName} (${columns}) VALUES (${values})`;
        await pool.request().query(query);
    }

    await pool.close();
}