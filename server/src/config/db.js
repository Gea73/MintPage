const { Pool } = require("pg");

//Version that works with localhost commented
//const path = require("path");

//require("dotenv").config({path:path.join(__dirname,"../../.env")});
try {
  

const pool = new Pool({
 connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
 /*  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASS,
  port: process.env.DB_PORT,
  */
});
module.exports = pool;
} catch (error) {
console.log(error);  
}

