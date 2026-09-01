import { Pool } from "pg";

const __dirname = import.meta.dirname;


if (
  process.env.NODE_ENV !== "development" &&
  process.env.NODE_ENV !== "production" && process.env.NODE_ENV !== "test"
) {
  throw new Error("Node environment not defined");
}

let pool:Pool;

if (process.env.NODE_ENV === "development" || process.env.NODE_ENV === "test") {
  pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASS,
    port: Number(process.env.DB_PORT),
  });
} else {
  pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: {
      rejectUnauthorized: false,
    },
  });
}
export { pool };
