import Client from '../database';

export type Order = {
  id?: number;
  user_id: number;
  status: string;
};

export class OrderModel {
  async index(): Promise<Order[]> {
    try {
      const conn = await Client.connect();
      const sql = 'SELECT * FROM orders';
      const result = await conn.query(sql);
      conn.release();
      return result.rows;
    } catch (error) {
      throw new Error(`Could not get orders. Error: ${error}`);
    }
  }

  async show(id: string): Promise<Order> {
    try {
      const conn = await Client.connect();
      const sql = 'SELECT * FROM orders WHERE id = ($1)';
      const result = await conn.query(sql, [id]);
      conn.release();
      return result.rows[0];
    } catch (error) {
      throw new Error(`Could not get order. Error: ${error}`);
    }
  }

  async find_active_order_by_user(user_id: string): Promise<Order> {
    try {
      const conn = await Client.connect();
      const sql = 'SELECT * FROM orders WHERE user_id = ($1) AND status = ($2)';
      const result = await conn.query(sql, [user_id, 'active']);
      conn.release();
      return result.rows[0];
    } catch (error) {
      throw new Error(`Could not get order. Error: ${error}`);
    }
  }

  async create(o: Order): Promise<Order> {
    try {
      const conn = await Client.connect();
      const sql = 'INSERT INTO orders (user_id) VALUES($1) RETURNING *';
      const result = await conn.query(sql, [o.user_id]);
      conn.release();
      const order = result.rows[0];
      return order;
    } catch (error) {
      throw new Error(`Could not create order. Error: ${error}`);
    }
  }

  async update(id: string): Promise<Order> {
    try {
      const conn = await Client.connect();
      const sql = 'UPDATE orders SET status = ($1) WHERE id = ($2) RETURNING *';
      const result = await conn.query(sql, ['completed', id]);
      conn.release();
      const order = result.rows[0];
      return order;
    } catch (error) {
      throw new Error(`Could not create order. Error: ${error}`);
    }
  }

  async addProduct(quantity: number, orderId: string, productId: string) {
    try {
      const sql =
        'INSERT INTO orders_products (order_id, product_id, quantity) VALUES ($1, $2, $3) RETURNING *';

      const conn = await Client.connect();

      const result = await conn.query(sql, [orderId, productId, quantity]);

      conn.release();
      return result.rows[0];
    } catch (err) {
      throw new Error(
        `Could not add product ${productId} to order ${orderId}: ${err}`
      );
    }
  }

  async find_order_product(orderId: string, productId: string) {
    try {
      const sql =
        'SELECT * FROM orders_products WHERE order_id = ($1) AND product_id = ($2)';

      const conn = await Client.connect();

      const result = await conn.query(sql, [orderId, productId]);

      conn.release();
      return result.rows[0];
    } catch (err) {
      throw new Error(`${err}`);
    }
  }
}
