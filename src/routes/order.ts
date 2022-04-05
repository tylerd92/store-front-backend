import express, { Request, Response } from 'express';
import { Order, OrderStore } from '../models/order';
import { OrderVideoGame, OrderVideoGameStore } from '../models/ordervideogame';

const orderStore = new OrderStore();
const orderVideoGameStore = new OrderVideoGameStore();

const showByUserId = async (req: Request, res: Response) => {
  const orders = await orderStore.showByUserId(req.params.userId);
  res.json(orders);
}

const create = async (req: Request, res: Response) => {
  try {
    const order: Order = {
      orderStatus: 'initiated',
      userId: req.body.userId
    };

    const newOrder = await orderStore.create(order);
    const orderVideoGame: OrderVideoGame = {
      quantity: req.body.quantity,
      orderId: newOrder.id,
      gameId: req.body.gameId
    };
    const newOrderVideoGame = await orderVideoGameStore.create(orderVideoGame);
    res.json({
      order: newOrder,
      orderVideoGame: newOrderVideoGame
    });
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