import express, { Request, Response } from 'express';
import { StoreUser, StoreUserStore } from '../models/storeuser';

const store = new StoreUserStore();

const index = async (_req: Request, res: Response) => {
  const users = await store.index();
  res.json(users);
}

const show = async (req: Request, res: Response) => {
  const storeUser = await store.show(req.body.id);
  res.json(storeUser);
}

const create = async (req: Request, res: Response) => {
  try {
    const storeUser: StoreUser = {
      username: req.body.username,
      password: req.body.password,
      email: req.body.email
    };

    const newStoreUser = await store.create(storeUser);
    res.json(newStoreUser);
  } catch(err) {
    res.status(400);
    res.json(err);
  }
}

const userRoutes = (app: express.Application) => {
  app.get('/users', index);
  app.get('/users/:id', show);
  app.post('/users', create);
}

export default userRoutes;