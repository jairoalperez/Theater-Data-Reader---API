import * as sql from 'mssql';
import * as dotenv from 'dotenv';

dotenv.config();

const requiredEnvVars = ['DB_USER', 'DB_PASSWORD', 'DB_SERVER', 'DB_DATABASE'];
for (const envVar of requiredEnvVars) {
    if (!process.env[envVar]) {
        throw new Error(`${envVar} is not a define env.`);
    }
}

const config: sql.config = {
    user: process.env.DB_USER as string,
    password: process.env.DB_PASSWORD as string,
    server: process.env.DB_SERVER as string,
    database: process.env.DB_DATABASE as string,
    options: {
        encrypt: true,
        trustServerCertificate: true
    }
};

export default config;