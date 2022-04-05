import Client from '../database';

export type OrderVideoGame = {
  id?: number;
  quantity: number;
  orderId?: number;
  gameId: number;
};

export class OrderVideoGameStore {
  async index(): Promise<OrderVideoGame[]> {
    try {
      const conn = await Client.connect();
      const sql = 'SELECT * FROM order_videogame';
      const result = await conn.query(sql);
      conn.release();
      return result.rows;
    } catch(err) {
      throw new Error(`Could not get video game. Error: ${err}`);
    }
  }

  async show(id: string): Promise<OrderVideoGame> {
    try {
      const conn = await Client.connect();
      const sql = 'SELECT * FROM order_videogame WHERE id=($1)';

      const result = await conn.query(sql, [id]);
      conn.release();
      return result.rows[0];
    } catch(err) {
      throw new Error(`Could not find order video game id: ${id}. Error: ${err}`);
    }
  }

  async create(vo: OrderVideoGame): Promise<OrderVideoGame> {
    try {
      const sql = 'INSERT INTO order_videogame(quantity, order_id, game_id) VALUES ($1, $2, $3) RETURNING *';
      const conn = await Client.connect();
      const result = await conn.query(sql, [vo.quantity, vo.orderId, vo.gameId]);
      const orderVideo = result.rows[0];
      conn.release();
      return orderVideo;
    } catch(err) {
      throw new Error(`Could not add new order video game. Error: ${err}`);
    }
  }
  
  async delete(id: string): Promise<OrderVideoGame> {
    try {
      const conn = await Client.connect();
      const sql = 'DELETE FROM order_videogame WHERE id=($1)';
      const result = await conn.query(sql, [id]);

      const orderVideoGame = result.rows[0];
      conn.release();
      return orderVideoGame;
    } catch(err) {
      throw new Error(`Could not delete order video game ${id}. Error: ${err}`);
    }
  }
};