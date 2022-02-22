import express, { Request, Response } from 'express';
import { VideoGame,VideoGameStore } from '../models/videogame';

const store = new VideoGameStore();

const index = async (_req: Request, res: Response) => {
  const videoGames = await store.index();
  res.json(videoGames);
}

const videoGameRoutes = (app: express.Application) => {
  app.get('/videogames', index);
}

export default videoGameRoutes;