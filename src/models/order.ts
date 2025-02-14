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
      const sql = 'SELECT * FROM orders';
      
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
      const sql = 'SELECT * FROM orders WHERE id=($1)';

      const result = await conn.query(sql, [id]);
      conn.release();
      return result.rows[0];
    } catch(err) {
      throw new Error(`Could not find order id: ${id}. Error: ${err}`);
    }
  }

  async showByUserId(id: string): Promise<Order[]> {
    try {
      const conn = await Client.connect();
      const sql = 'SELECT * FROM orders WHERE store_user_id=($1)';

      const result = await conn.query(sql, [id]);
      conn.release();
      return result.rows;
    } catch(err) {
      throw new Error(`Could not find order id: ${id}. Error: ${err}`);
    }
  }

  async showByStatusUserId(id: string, status: string): Promise<Order[]> {
    try {
      const conn = await Client.connect();
      const sql = 'SELECT * FROM orders WHERE store_user_id=($1) and order_status=($2)';

      const result = await conn.query(sql, [id, status]);
      conn.release();
      return result.rows;
    } catch(err) {
      throw new Error(`Could not find order id: ${id}. Error: ${err}`);
    }
  }

  async create(order: Order): Promise<Order> {
    try {
      const sql = 'INSERT INTO orders(order_status, store_user_id) VALUES ($1, $2) RETURNING *';
      const conn = await Client.connect();
      const result = await conn.query(sql, [order.orderStatus, order.userId]);
      
      const o = result.rows[0];
      conn.release();
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