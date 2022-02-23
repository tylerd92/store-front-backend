import express, { Request, Response } from 'express';
import { Order, OrderStore } from '../models/order';

const store = new OrderStore();

const showByUserId = async (req: Request, res: Response) => {
  const orders = await store.showByUserId(req.body.userId);
  res.json(orders);
}

const create = async (req: Request, res: Response) => {
  try {
    const order: Order = {
      orderStatus: 'initiated',
      userId: req.body.userId
    };
    const newOrder = await store.create(order);
    res.json(newOrder);
  } catch(err) {
    res.status(400);
    res.json(err);
  }
}

const orderRoutes = (app: express.Application) => {
  app.get('/orders/:userId', showByUserId);
  app.post('/orders', create);
}

export default orderRoutes;