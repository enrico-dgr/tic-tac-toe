import db from '../db';
import { Router } from 'express';
import cors from 'cors';

const gamesRouter = Router();

gamesRouter.get('/', (req, res) => {
  // Get all users
});

gamesRouter.post('/', (req, res) => {
  // Create a new user
});

gamesRouter.get('/guest', (req, res) => {
  // Get guest
  const rows = db.query('SELECT * FROM games');
  res.json(rows);
});

gamesRouter.use(
  cors({
    origin: 'http://localhost:19006'
  })
);

export default gamesRouter;
