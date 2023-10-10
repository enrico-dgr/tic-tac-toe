import cors from 'cors';
import db from '../db';
import { Router, Request, Response } from 'express';

const usersRouter = Router();

usersRouter.use(
  cors({
    origin: 'http://localhost:19006'
  })
);

type User = {
  name: string
}

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

const newGuest = async (req: Request<{}, {}, {}, {}>, res: Response) => {
  let userBeforeNameUpdate: User | undefined;
  let user: User | undefined;
  let id = -1;

  const r = await db.insert({
    into: 'Users',
    properties: {
      name: 'guest'
    }
  })

  if (r.type === 'success') {
    userBeforeNameUpdate = { name: `guest${r.result.insertId}` };
    id = r.result.insertId;
  } else {
    res.statusMessage = r.message;
  }

  if (userBeforeNameUpdate) {
    const updateRes = await db.update({
      update: 'Users',
      set: {
        name: userBeforeNameUpdate.name
      },
      where: {
        id
      }
    })

    if (updateRes.type === 'success') {
      user = {
        ...userBeforeNameUpdate
      }
    } else {
      res.statusMessage = updateRes.message;
    }
  }

  if (user) {
    res.statusCode = 200;
    res.json(user);
  } else {
    res.sendStatus(400);
  }
};

const getUserByUsername = async (req: Request<{ userName: string }>, res: Response) => {
  // Get guest
  let user: User | undefined;

  const r = await db.select<User>({
    from: 'Users',
    properties: ['name'],
    where: {
      name: req.params.userName
    }
  })

  if (r.type === 'success') {
    if (r.results.length < 1) {
      res.statusCode = 404;
    } else {
      res.statusCode = 200;
      user = r.results[0];
    }
  } else {
    res.statusCode = 500;
    res.statusMessage = r.message;
  }

  if (user) {
    res.json(user);
  } else {
    res.sendStatus(res.statusCode);
  }
};

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
usersRouter.get('/newGuest', newGuest);

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
usersRouter.get('/:userName', getUserByUsername);

export default usersRouter;
