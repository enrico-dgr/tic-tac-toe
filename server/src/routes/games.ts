import db from '../db';
import { Request, Response, Router } from 'express';
import cors from 'cors';

const gamesRouter = Router();

gamesRouter.use(
  cors({
    origin: 'http://localhost:19006'
  })
);

type GameDB = {
  id: number;
  name?: string;
  size: number;
  difficulty: number;
  moves: 0;
  created_at: Date;
  lastModified: Date;
};

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

const getGameById = async (req: Request<{ id: string }>, res: Response) => {
  const r = await db.select<GameDB>({
    from: 'Games',
    where: {
      id: req.params.id
    }
  });

  if (r.type === 'success') {
    if (r.results.length < 1) {
      res.statusMessage = 'Game not found';
      res.sendStatus(404);
      return;
    }

    const gameDb = r.results[0];

    const game: Game = {
      id: gameDb.id,
      difficulty: difficulty.toStr(gameDb.difficulty),
      size: gameDb.size,
      name: gameDb.name
    };

    // User id exists, proceed to get match
    // Get running game by user's id
    res.send(game);
  } else {
    res.sendStatus(400);
  }
};

/**
 * @todo Add dynamic type validation on code and
 * give unique names to check-constraints in MySql
 * so to Regex them with code and give
 * meaningful error message inside the response.
 */
gamesRouter.post('/', async (req: Request<{}, {}, Omit<Game, 'id'>, {}>, res) => {
  if (req.headers['content-type'] !== 'application/json') {
    res.statusMessage = 'Content-Type must be application/json.';
    res.sendStatus(400);
    return;
  }

  // Create a new game
  let game: Game;

  /**
   * @todo check `insert` and `select` results' types
   */
  /**
   * @todo define Game object construction ( with players and other frontend-useful data )
   */
  const r = await db.insert({
    into: 'Games',
    properties: {
      name: req.body.name,
      size: req.body.size,
      difficulty: difficulty.toNumber(req.body.difficulty)
    }
  });

  // ResultSetHeader
  if (r.type === 'success') {
    // Return the game with ID
    game = {
      ...req.body,
      // id: r.res.insertId
      id: 2
    };

    res.statusCode = 200;
    res.json(game);
  } else {
    res.statusMessage = r.message;
    res.sendStatus(400);
  }
});

/**
 * @openapi
 * /games/{id}:
 *   get:
 *     description: Returns game by game's id.
 *     parameters:
 *     - name: id
 *       description: Id of the game.
 *       in: path
 *       required: true
 *     responses:
 *       200:
 *         description: Json data of game.
 *         content:
 *          application/json:
 *            schema:
 *              type: object
 *       404:
 *         description: Game not found.
 *       500:
 *         description: Server error
 */
gamesRouter.get('/:id', getGameById);

export default gamesRouter;
