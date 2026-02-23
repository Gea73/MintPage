import { Pool } from "pg";
import path from "path";

import dotenv from "dotenv";

const __dirname = import.meta.dirname;
dotenv.config({path:path.join(__dirname,"../../.env")});

console.log(process.env.NODE_ENV);

let pool;

if (process.env.NODE_ENV == "dev") {
  pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASS,
    port: process.env.DB_PORT,
  });
} else {
  pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: {
      rejectUnauthorized: false,
    },
  });
}
export {pool};
