const mysql = require("mysql2/promise");
const env = require("dotenv");

env.config();

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

if (pool.err) {
  throw err;
}

console.log("Mysql connected...");

module.exports = pool;
