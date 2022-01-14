import Client from '../database';

export type VideoGame = {
  id: number;
  title: string;
  genre: string;
  price: number;
  summary: string;
}; 

export class VideoGameStore {
  // will contain code to get data from the database
  /*
    Methods
    index
    show 
    create
    update
    delete
  */
  async index(): Promise<VideoGame[]> {
    try {
      const conn = await Client.connect();
      const sql = 'SELECT * videogames';
      const result = await conn.query(sql);

      conn.release();
      return result.rows;
      
    } catch(err) {
      throw new Error(`Could not get videogames. Error: ${err}`);
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
};