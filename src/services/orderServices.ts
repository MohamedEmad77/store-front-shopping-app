import Client from '../database';
import { Order, OrderModel } from '../models/order';

export const get_order_creator = async (id: string) => {
  const model = new OrderModel();
  const order = await model.show(id);
  return order.user_id;
};

export const check_if_product_and_order_exist = async function (
  order_id: string,
  product_id: string
) {
  const model = new OrderModel();
  const order = await model.find_order_product(order_id, product_id);
  if (order) return true;
  return false;
};

export const get_order_details = async function (order_id: string) {
  try {
    const conn = await Client.connect();
    const sql =
      'SELECT o.id as order_id, p.id as product_id, p.name as product_name, p.price, j.quantity, o.status FROM orders o INNER JOIN orders_products j ON o.id = ($1) AND o.id = j.order_id INNER JOIN products p ON j.product_id = p.id';
    const result = await conn.query(sql, [order_id]);
    conn.release();
    //console.log(result.rows);
    return result.rows;
  } catch (error) {
    throw new Error(`Could not get orders. Error: ${error}`);
  }
};
