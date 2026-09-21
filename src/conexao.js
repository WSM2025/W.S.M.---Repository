// src/conexao.js
import mysql from "mysql2";

const pool = mysql.createPool({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "",
  database: "wsm",
}).promise();

export default pool;