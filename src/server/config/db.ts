import { error } from "node:console";
import { Pool } from "pg";


if (
  process.env.NODE_ENV !== "development" &&
  process.env.NODE_ENV !== "production" && process.env.NODE_ENV !== "test"
) {
  throw new Error("NODE_ENV undefined");
}


const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  max: 20,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 5000,
  ssl: {
    rejectUnauthorized: process.env.NODE_ENV === "production" ? true : false,
  },
});

pool.on("error", (err) => {
  console.error("Error in the Database", err)
})



export { pool };
