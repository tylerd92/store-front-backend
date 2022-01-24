import Client from '../database';

export type Order = {
  id?: number;
  orderStatus: string;
  userId: number
};

export class OrderStore {
  async index(): Promise<Order[]> {
    try {
      const conn = await Client.connect();
      const sql = 'SELECT * orders';
      
      const result = await conn.query(sql);
      conn.release();
      return result.rows;
    } catch(err) {
      throw new Error(`Could not get orders. Error: ${err}`);
    }
  }

  async show(id: string): Promise<Order> {
    try {
      const conn = await Client.connect();
      const sql = 'SELECT * FROM orders WHERE id($1)';

      const result = await conn.query(sql, [id]);
      conn.release();
      return result.rows[0];
    } catch(err) {
      throw new Error(`Could not find order id: ${id}. Error: ${err}`);
    }
  }

  async create(order: Order): Promise<Order> {
    try {
      const sql = 'INSERT INTO orders VALUES ($1, $2) RETURNING *';
      const conn = await Client.connect();
      const result = await conn.query(sql, [order.orderStatus, order.userId]);

      conn.release();
      const o = result.rows[0];
      return o;
    } catch(err) {
      throw new Error(`Could not add new order. Error: ${err}`);
    }
  }

  async delete(id: string): Promise<Order> {
    try {
      const conn = await Client.connect();
      const sql = 'DELETE FROM orders WHERE id=($1)';
      const result = await conn.query(sql, [id]);

      const order = result.rows[0];
      conn.release();
      return order;
    } catch(err) {
      throw new Error(`Could not delete order ${id}. Error: ${err}`);
    }
  }
};