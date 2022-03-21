import express, { Request, Response } from 'express';
import { VideoGame, VideoGameStore } from '../models/videogame';

const store = new VideoGameStore();

const index = async (_req: Request, res: Response) => {
  const videoGames = await store.index();
  res.json(videoGames);
}

const show = async (req: Request, res: Response) => {
  const videoGame = await store.show(req.params.id);
  res.json(videoGame);
}

const create = async (req: Request, res: Response) => {
  try {
    const videoGame: VideoGame = {
      title: req.body.title,
      genre: req.body.genre,
      price: req.body.price,
      summary: req.body.summary
    }

    const newGame = await store.create(videoGame);
    res.json(newGame);

  } catch(err) {
    res.status(400);
    res.json(err);
  }
}

const videoGameRoutes = (app: express.Application) => {
  app.get('/videogames/', index);
  app.get('/videogames/:id', show);
  app.post('/videogames', create);
}

export default videoGameRoutes;