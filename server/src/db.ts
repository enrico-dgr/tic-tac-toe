import mysql from "mysql2";

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "ze1Jl4.3</k^{#!@",
  database: 'TICTACTOE'
});

// Connect to MySQL database
db.connect((err) => {
  if (err) throw err;

  console.log("Connected to MySQL database!");
});

export default db;