import { RequestHandler } from 'express';

export const applicationJson: RequestHandler = async (req, res, next) => {
  if (req.headers['content-type'] !== 'application/json') {
    res.statusMessage = 'Content-Type must be application/json.';
    res.sendStatus(400);
    return;
  }

  next();
}