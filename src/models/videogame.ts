import Client from '../database';

export type VideoGame = {
  id?: number;
  title: string;
  genre: string;
  price: number | string;
  summary: string;
}; 

export class VideoGameStore {
  async index(): Promise<VideoGame[]> {
    try {
      const conn = await Client.connect();
      const sql = 'SELECT * FROM videogames';
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
      const sql = 'INSERT INTO videogames (title, genre, price, summary) VALUES ($1, $2, $3, $4) RETURNING *';
      const conn = await Client.connect();
      const result = await conn.query(sql, [game.title, game.genre, game.price, game.summary]);
      
      const videoGame = result.rows[0];
      conn.release();
      return videoGame;
    } catch(err) {
      throw new Error(`Could not add new video game. Error: ${err}`);
    }
  }
};