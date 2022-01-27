import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
import Client from '../database';

dotenv.config();

export type StoreUser = {
  id?: number;
  username: string;
  password: string;
  email: string;
};

const { 
  SALT_ROUNDS,
  PEPPER
} = process.env;

export class StoreUserStore {
  async create(u: StoreUser): Promise<StoreUser> {
    try {
      const saltRounds = SALT_ROUNDS as string;
      const pepper = PEPPER;
      const conn = await Client.connect();

      const sql = 'INSERT INTO storeusers (username, user_password, email) VALUES($1, $2, $3) RETURNING *';
      const hash = bcrypt.hashSync(
        u.password + pepper, 
        parseInt(saltRounds)
      ); 
      const result = await conn.query(sql, [u.username, hash, u.email]);
      const user = result.rows[0];
      conn.release();
      return user;
    } catch(err) {
      throw new Error(`unable create user (${u.username}): ${err}`);
    }
  }

  async show(id: string): Promise<StoreUser> {
    try {
      const conn = await Client.connect();
      const sql = 'SELECT * FROM storeusers WHERE id=($1)';

      const result = await conn.query(sql, [id]);
      conn.release();
      return result.rows[0];
    } catch(err) {
      throw new Error(`unable find user with id (${id}): ${err}`);
    }
  }

  async index(): Promise<StoreUser[]> {
    try {
      const conn = await Client.connect();
      const sql = 'SELECT * FROM storeusers';
      const result = await conn.query(sql);

      conn.release();
      return result.rows;
    } catch(err) {
      throw new Error(`Could not get users. Error: ${err}`)
    }
  }
};