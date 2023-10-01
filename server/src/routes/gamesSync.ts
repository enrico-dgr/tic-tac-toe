import db from '../db';
import { Request, Router } from 'express';
import cors from 'cors';
import { ResultSetHeader, RowDataPacket } from 'mysql2';

const gamesRouter = Router();

gamesRouter.use(
  cors({
    origin: 'http://localhost:19006'
  })
);

type GameDB = { id: number; name?: string; size: number; difficulty: number };
type Game = { id: number; name?: string; size: number; difficulty: keyof typeof Diff };

enum Diff {
  easy = 0,
  normal = 1,
  hard = 2,
  'very hard' = 3,
  strategist = 4,
  seer = 5
}

const difficultyMap: { [K in keyof typeof Diff]: (typeof Diff)[K] } = {
  easy: 0,
  normal: 1,
  hard: 2,
  'very hard': 3,
  strategist: 4,
  seer: 5
};

const difficulty = {
  toNumber: (str: keyof typeof Diff) => difficultyMap[str],
  toStr: (num: Diff) => {
    const [key] = Object.entries(difficultyMap).find(([_, value]) => value === num) as [
      keyof typeof Diff,
      Diff
    ];

    return key;
  }
};

gamesRouter.get('/:id', (req: Request<{ id: string }>, res) => {
  db.query(
    'SELECT * FROM Games WHERE id = ?',
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

      // User id exists, proceed to get match
      // Get running game by user's id
    }
  );
});

/**
 * @todo Add dynamic type validation on code and
 * give unique names to check-constraints in MySql
 * so to Regex them with code and give
 * meaningful error message inside the response.
 */
gamesRouter.post('/', (req: Request<{}, {}, Omit<Game, 'id'>, {}>, res) => {
  if (req.headers['content-type'] !== 'application/json') {
    res.statusMessage = 'Content-Type must be application/json.';
    res.sendStatus(400);
    return;
  }

  // Create a new game
  let game: Game;

  const values = [req.body.name, req.body.size, difficulty.toNumber(req.body.difficulty)];

  /**
   * @todo convert queries' callbacks into promises 
   */
  /**
   * @todo define Game object construction ( with players and other frontend-useful data ) 
   */
  db.query(
    'INSERT INTO Games (name, size, difficulty) VALUES (?, ?, ?)',
    values,
    (err, resultSet: ResultSetHeader) => {
      if (err) {
        if (err.code === 'ER_CHECK_CONSTRAINT_VIOLATED') {
          res.statusMessage = `Values are not valid.`;
        } else {
          console.log('Unhandled mysql error code', {
            ...err // Spread avoids logging of error's `stack`.
          });
        }

        res.sendStatus(400);

        return;
      }

      // Return the game with ID
      game = {
        ...req.body,
        id: resultSet.insertId
      };

      res.statusCode = 200;
      res.json(game);
    }
  );
});

export default gamesRouter;
