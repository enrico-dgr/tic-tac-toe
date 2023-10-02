import db from '../db';
import { Request, Response, Router } from 'express';
import cors from 'cors';
import { applicationJson } from '../middlewares/headers/contentType';
import * as auth from '../middlewares/auth';

/**
 * @todo Missing `moves` in `Game`
 */

const gamesRouter = Router();

gamesRouter.use(
  cors({
    origin: 'http://localhost:19006'
  })
);

type GameDB = {
  id: number;
  name: string;
  size: number;
  difficulty: number;
  moves: 0;
  created_at: Date;
  lastModified: Date;
};

type Game = {
  id: number;
  name: string;
  size: number;
  difficulty: keyof typeof Diff;
  players: { userId: number }[];
};

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
  let game: Game | undefined = undefined;

  const gameResult = await db.select<GameDB>({
    from: 'Games',
    where: {
      id: req.params.id
    }
  });

  let gameDb: GameDB | undefined = undefined;

  if (gameResult.type === 'success') {
    if (gameResult.results.length < 1) {
      res.statusMessage = 'Game not found';
      res.sendStatus(404);
      return;
    }

    gameDb = gameResult.results[0];
  }

  let players: { userId: number }[] | undefined = undefined;

  if (gameDb) {
    const playersRes = await db.select<{ userId: number; gameId: number }>({
      from: 'Players',
      where: {
        gameId: gameDb.id
      }
    });

    if (playersRes.type === 'success') {
      players = playersRes.results.map((p) => ({ userId: p.userId }));
    }
  }

  if (gameDb && players) {
    game = {
      id: gameDb.id,
      difficulty: difficulty.toStr(gameDb.difficulty),
      size: gameDb.size,
      name: gameDb.name,
      players
    };
  }

  if (game) {
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
 *
 * @todo Add middleware for auth
 */
const createGame = async (
  req: Request<{}, {}, Omit<Game, 'id' | 'players'> & auth.JwtBodyExt, {}>,
  res: Response
) => {
  let gameNoPlayers: Omit<Game, 'players'> | undefined = undefined;

  const r = await db.insert({
    into: 'Games',
    properties: {
      name: req.body.name,
      size: req.body.size,
      difficulty: difficulty.toNumber(req.body.difficulty)
    }
  });

  if (r.type === 'success') {
    gameNoPlayers = {
      ...req.body,
      id: r.result.insertId
    };
  } else {
    res.statusMessage = r.message;
    res.sendStatus(400);
  }

  let game: Game | undefined = undefined;

  if (gameNoPlayers) {
    const playerRes = await db.insert({
      into: 'Players',
      properties: {
        gameId: gameNoPlayers.id,
        userId: req.body.auth.userId
      }
    });

    if (playerRes.type === 'success') {
      game = {
        ...gameNoPlayers,
        players: [{ userId: req.body.auth.userId }]
      };
    }
  }

  if (game) {
    res.statusCode = 200;
    res.json(game);
  }
};

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

/**
 * @openapi
 * /games:
 *   post:
 *     description: Create game and returns it.
 *     responses:
 *       200:
 *         description: Json data of game.
 *         content:
 *          application/json:
 *            schema:
 *              type: object
 *       400:
 *         description: Unknown error.
 *       404:
 *         description: Wrong header.
 *       500:
 *         description: Server error
 */
gamesRouter.post('/', applicationJson, auth.jwt, createGame);

export default gamesRouter;
