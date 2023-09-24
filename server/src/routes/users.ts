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
  const newUser = req.body;

  // Create a new user
  res.statusCode = 201;
  res.status(201).json(newUser);
});

/**
 * @openapi
 * /users/newGuest:
 *   get:
 *     description: Get new guest-user's data
 *     responses:
 *       200:
 *         description: User's json data
 *       500:
 *         description: Server error 
 */
usersRouter.get('/newGuest', async (req: Request<{}, {}, {}, {}>, res) => {
  let user: any;

  db.query(
    'INSERT INTO users (name) VALUES (?)',
    ['guest'],
    (err, resultSet: ResultSetHeader) => {
      if (err) {
        res.sendStatus(400);
        return;
      }

      db.query(
        'UPDATE users SET name=? WHERE id=?',
        ['guest' + resultSet.insertId, resultSet.insertId],
        (err, resultSet: ResultSetHeader) => {
          if (err) {
            res.sendStatus(400);
            return;
          }

          user = { name: `guest${resultSet.insertId}` };

          res.statusCode = 200;
          res.json(user);
        }
      );
    }
  );
});

/**
 * @openapi
 * /users/{userName}:
 *   get:
 *     description: Returns user by user-name.
 *     parameters:
 *     - name: userName
 *       description: Username used to log in.
 *       in: path
 *       required: true
 *     responses:
 *       200:
 *         description: Json data of user.
 *         content:
 *          application/json:
 *            schema:
 *              type: object
 *       404:
 *         description: User not found.
 *       500:
 *         description: Server error 
 */
usersRouter.get('/:userName', async (req: Request<{ userName: string }>, res) => {
  // Get guest
  let user: any;

  db.query(
    'SELECT (name) FROM users WHERE name = ?',
    [req.params.userName],
    (err, rowPackets: RowDataPacket[]) => {
      if (err) {
        res.sendStatus(500);
        return;
      }

      if (rowPackets.length < 1) {
        res.sendStatus(404);
        return;
      }

      user = rowPackets[0] as any;

      res.statusCode = 200;
      res.json(user);
    }
  );
});

export default usersRouter;
