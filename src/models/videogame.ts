import Client from '../database';

export type VideoGame = {
  id: number;
  title: string;
  genre: string;
  price: number;
  summary: string;
}; 

export class VideoGameStore {
  async index(): Promise<VideoGame[]> {
    try {
      const conn = await Client.connect();
      const sql = 'SELECT * videogames';
      const result = await conn.query(sql);

      conn.release();
      return result.rows;
      
    } catch(err) {
      throw new Error(`Could not get video games. Error: ${err}`);
    }
  }

  async show(id: string): Promise<VideoGame> {
    try {
      const conn = await Client.connect();
      const sql = 'SELECT * FROM videogames WHERE id=($1)';
      
      const result = await conn.query(sql, [id]);
      conn.release();
      return result.rows[0];
    } catch(err) {
      throw new Error(`Could not find video game id: ${id}. Error: ${err}`);
    }
  }

  async create(game: VideoGame): Promise<VideoGame> {
    try {
      const sql = 'INSERT INTO videogames VALUES ($1, $2, $3, $4) RETURNING *';
      const conn = await Client.connect();
      const result = await conn.query(sql, [game.title, game.genre, game.price, game.summary]);

      conn.release();
      const videoGame = result.rows[0];
      return videoGame;
    } catch(err) {
      throw new Error(`Could not add new video game. Error: ${err}`);
    }
  }

  async delete(id: string): Promise<VideoGame> {
    try {
      const sql = 'DELETE FROM videogames WHERE id=($1)';
      const conn = await Client.connect();
      const result = await conn.query(sql, [id]);

      const game = result.rows[0];
      conn.release();
      return game;
    } catch(err) {
      throw new Error(`Could not delete video game ${id}. Error: ${err}`);
    }
  }
};