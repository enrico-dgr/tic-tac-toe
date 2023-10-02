import db from '../db';
import { Request, Response, Router } from 'express';
import cors from 'cors';
import { applicationJson } from '../middlewares/headers/contentType';

const playersRouter = Router();

playersRouter.use(
  cors({
    origin: 'http://localhost:19006'
  })
);

export const addPlayerToGame = async (
  req: Request<{}, {}, { gameId: number; userId: number }, {}>,
  res: Response
) => {
  const r = await db.insert({
    into: 'Players',
    properties: {
      gameId: req.body.gameId,
      userId: req.body.userId
    }
  });

  if (r.type === 'success') {
    res.statusCode = 200;
    res.json({
      userId: req.body.userId
    });
  } else {
    res.statusMessage = r.message;
    res.sendStatus(400);
  }
};

playersRouter.post('/', applicationJson, addPlayerToGame);

export default playersRouter;
