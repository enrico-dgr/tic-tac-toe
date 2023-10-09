import mysql from 'mysql2/promise';
import insert from './insert';
import select from './select';
import update from './update';

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
  update: update(db),
  insert: insert(db),
  select: select(db)
};
