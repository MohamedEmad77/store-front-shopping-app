"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.get_order_details = exports.check_if_product_and_order_exist = exports.get_order_creator = void 0;
const database_1 = __importDefault(require("../database"));
const order_1 = require("../models/order");
const get_order_creator = async (id) => {
    const model = new order_1.OrderModel();
    const order = await model.show(id);
    return order.user_id;
};
exports.get_order_creator = get_order_creator;
const check_if_product_and_order_exist = async function (order_id, product_id) {
    const model = new order_1.OrderModel();
    const order = await model.find_order_product(order_id, product_id);
    if (order)
        return true;
    return false;
};
exports.check_if_product_and_order_exist = check_if_product_and_order_exist;
const get_order_details = async function (order_id) {
    try {
        const conn = await database_1.default.connect();
        const sql = 'SELECT o.id as order_id, p.name as product_name, p.price, j.quantity, o.status FROM orders o INNER JOIN orders_products j ON o.id = ($1) AND o.id = j.order_id INNER JOIN products p ON j.product_id = p.id';
        const result = await conn.query(sql, [order_id]);
        conn.release();
        //console.log(result.rows);
        return result.rows;
    }
    catch (error) {
        throw new Error(`Could not get orders. Error: ${error}`);
    }
};
exports.get_order_details = get_order_details;
