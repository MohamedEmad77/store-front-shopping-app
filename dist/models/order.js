"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderModel = void 0;
const database_1 = __importDefault(require("../database"));
class OrderModel {
    async index() {
        try {
            const conn = await database_1.default.connect();
            const sql = 'SELECT * FROM orders';
            const result = await conn.query(sql);
            conn.release();
            return result.rows;
        }
        catch (error) {
            throw new Error(`Could not get orders. Error: ${error}`);
        }
    }
    async show(id) {
        try {
            const conn = await database_1.default.connect();
            const sql = 'SELECT * FROM orders WHERE id = ($1)';
            const result = await conn.query(sql, [id]);
            conn.release();
            return result.rows[0];
        }
        catch (error) {
            throw new Error(`Could not get order. Error: ${error}`);
        }
    }
    async find_active_order_by_user(user_id) {
        try {
            const conn = await database_1.default.connect();
            const sql = 'SELECT * FROM orders WHERE user_id = ($1) AND status = ($2)';
            const result = await conn.query(sql, [user_id, 'active']);
            conn.release();
            return result.rows[0];
        }
        catch (error) {
            throw new Error(`Could not get order. Error: ${error}`);
        }
    }
    async create(o) {
        try {
            const conn = await database_1.default.connect();
            const sql = 'INSERT INTO orders (user_id) VALUES($1) RETURNING *';
            const result = await conn.query(sql, [o.user_id]);
            conn.release();
            const order = result.rows[0];
            return order;
        }
        catch (error) {
            throw new Error(`Could not create order. Error: ${error}`);
        }
    }
    async update(id) {
        try {
            const conn = await database_1.default.connect();
            const sql = 'UPDATE orders SET status = ($1) WHERE id = ($2) RETURNING *';
            const result = await conn.query(sql, ['completed', id]);
            conn.release();
            const order = result.rows[0];
            return order;
        }
        catch (error) {
            throw new Error(`Could not create order. Error: ${error}`);
        }
    }
    async addProduct(quantity, orderId, productId) {
        try {
            const sql = 'INSERT INTO orders_products (order_id, product_id, quantity) VALUES ($1, $2, $3) RETURNING *';
            const conn = await database_1.default.connect();
            const result = await conn.query(sql, [orderId, productId, quantity]);
            conn.release();
            return result.rows[0];
        }
        catch (err) {
            throw new Error(`Could not add product ${productId} to order ${orderId}: ${err}`);
        }
    }
    async find_order_product(orderId, productId) {
        try {
            const sql = 'SELECT * FROM orders_products WHERE order_id = ($1) AND product_id = ($2)';
            const conn = await database_1.default.connect();
            const result = await conn.query(sql, [orderId, productId]);
            conn.release();
            return result.rows[0];
        }
        catch (err) {
            throw new Error(`${err}`);
        }
    }
}
exports.OrderModel = OrderModel;
