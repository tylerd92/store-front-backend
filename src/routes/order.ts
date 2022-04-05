import express, { Request, Response } from 'express';
import { Order, OrderStore } from '../models/order';
import { OrderVideoGame, OrderVideoGameStore } from '../models/ordervideogame';

const orderStore = new OrderStore();
const orderVideoGameStore = new OrderVideoGameStore();

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

const showOrderByUser = async (req: Request, res: Response) => {
  try {
    const userId = req.params.id;
    const activeOrders = await orderStore.showByStatusUserId(userId, 'active');
    const order = activeOrders[0];
    const orderId = order.id!;
    const orderVideoGames = await orderVideoGameStore.showByOrderId(orderId.toString());
    
    res.json({
      order: order,
      orderVideoGamesByOrderId: orderVideoGames
    });
  } catch(err) {
    res.status(400);
    res.json(err);
  }
}

const orderRoutes = (app: express.Application) => {
  app.get('/orders/:id', showOrderByUser);
  app.post('/orders', create);
}

export default orderRoutes;