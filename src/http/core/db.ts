import * as mysql from 'mysql';
import * as dotenv from 'dotenv';
dotenv.config();

/**
 * ! MYSQL Server connection layer
 * * whitehatdevv - 2021/12/11
 */
export const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PWD,
    database: process.env.DB_NAME
});