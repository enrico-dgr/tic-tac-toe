import mysql from 'mysql2/promise';
import insert from './insert';
import select from './select';

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'ze1Jl4.3</k^{#!@',
  database: 'TICTACTOE'
});

// Connect to MySQL database
db.then((s) => {
  s.query;
  console.log('Connected to MySQL database!');
}).catch((err) => {
  throw err;
});

export default {
  insert: insert(db),
  select: select(db)
};
