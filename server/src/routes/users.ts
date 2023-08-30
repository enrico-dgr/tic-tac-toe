import { ResultSetHeader, RowDataPacket } from 'mysql2';
import cors from 'cors';
import db from '../db';
import { Router, Request } from 'express';

const usersRouter = Router();

usersRouter.use(
  cors({
    origin: 'http://localhost:19006'
  })
);

usersRouter.get('/', (req, res) => {
  // Get all users
  res.json([]);
});

usersRouter.post('/', (req, res) => {
  const newUser = req.body

  // Create a new user
  res.statusCode = 201;
  res.status(201).json(newUser);
});

usersRouter.get('/guest', async (req: Request<{}, {}, {}, { name?: string }>, res) => {
  let user: any;

  db.query(
    'INSERT INTO users (name) VALUES (?)',
    ['guest'],
    (err, resultSet: ResultSetHeader) => {
      if (err) {
        res.sendStatus(400);
        return;
      }

      user = {
        name: 'guest' + resultSet.insertId
      };

      res.statusCode = 200;
      res.json(user);
    }
  );
});

usersRouter.get('/guest/:id', async (req: Request<{ id: string }>, res) => {
  // Get guest
  let user: any;

  db.query(
    'SELECT (name) FROM users WHERE id = ?',
    [req.params.id],
    (err, rowPackets: RowDataPacket[]) => {
      if (err) {
        res.sendStatus(400);
        return;
      }

      if (rowPackets.length < 1) {
        res.sendStatus(404);
        return;
      }

      user = rowPackets[0] as any;

      user.name += req.params.id;

      res.statusCode = 200;
      res.json(user);
    }
  );
});



export default usersRouter;
