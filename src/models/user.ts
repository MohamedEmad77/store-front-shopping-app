import Client from '../database';
export type User = {
  id?: number;
  firstName: string;
  lastName: string;
  password: string;
  email: string;
};

export class UserModel {
  async index(): Promise<User[]> {
    try {
      const conn = await Client.connect();
      const sql = 'SELECT * FROM users';
      const result = await conn.query(sql);
      conn.release();
      return result.rows;
    } catch (error) {
      throw new Error(`Could not get users. Error: ${error}`);
    }
  }

  async delete(): Promise<User[]> {
    try {
      const conn = await Client.connect();
      const sql = 'DELETE FROM users';
      const result = await conn.query(sql);
      conn.release();
      return result.rows;
    } catch (error) {
      throw new Error(`Could not get users. Error: ${error}`);
    }
  }

  async show(id: string): Promise<User> {
    try {
      const conn = await Client.connect();
      const sql = 'SELECT * FROM users WHERE id = ($1)';
      const result = await conn.query(sql, [id]);
      conn.release();
      return result.rows[0];
    } catch (error) {
      throw new Error(`Could not get user. Error: ${error}`);
    }
  }

  async find_by_email(email: string): Promise<User> {
    try {
      const conn = await Client.connect();
      const sql = 'SELECT * FROM users WHERE email = ($1)';
      const result = await conn.query(sql, [email]);
      conn.release();
      return result.rows[0];
    } catch (error) {
      throw new Error(`Could not get user. Error: ${error}`);
    }
  }

  async create(u: User): Promise<User> {
    try {
      // console.log(u);
      const conn = await Client.connect();
      const sql =
        'INSERT INTO users (firstName, lastName, email, password) VALUES($1, $2, $3, $4) RETURNING *';
      const result = await conn.query(sql, [
        u.firstName,
        u.lastName,
        u.email,
        u.password,
      ]);
      conn.release();
      const user = result.rows[0];
      return user;
    } catch (error) {
      throw new Error(`Could not create user. Error: ${error}`);
    }
  }
}
