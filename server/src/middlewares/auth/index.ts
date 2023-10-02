import jsonwebtoken from 'jsonwebtoken';
import * as core from 'express-serve-static-core';
import { Request as ReqExpress, RequestHandler } from 'express';

type JwtPayload = {
  userId: number;
};

export type JwtBodyExt = {
  auth: {
    userId: number;
  };
};

export const jwt: RequestHandler = async (req, res, next) => {
  const authorizationHeader = req.headers['authorization'];

  let payload: null | JwtPayload = null;

  if (authorizationHeader) {
    payload = jsonwebtoken.verify(
      authorizationHeader.replace('Bearer ', ''),
      'my-secret',
      { algorithms: ['HS256'] }
    ) as JwtPayload | null;
  }

  if (payload) {
    req.body.auth = payload;
    next();
    return;
  }

  res.sendStatus(401);
};
