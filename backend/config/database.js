const mysql = require("mysql");
require("dotenv").config();
// Define connection pool
const pool = mysql.createPool({
  user: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: process.env.DATABASE,
  connectionLimit: 10,
});
//Some random Stuff

module.exports = pool;
