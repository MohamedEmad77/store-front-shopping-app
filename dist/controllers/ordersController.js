"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrdersController = void 0;
const order_1 = require("../models/order");
class OrdersController {
    async index(req, res) {
        const model = new order_1.OrderModel;
        try {
            const orders = await model.index();
            res.json(orders);
        }
        catch (error) {
            res.json(error);
        }
    }
    async show(req, res) {
        const model = new order_1.OrderModel;
        try {
            const order = await model.show(req.body.id);
            res.json(order);
        }
        catch (error) {
            res.json(error);
        }
    }
    async create(_req, res) {
        console.log(_req.body.user_id);
        const o = {
            user_id: _req.body.user_id,
            status: 'active'
        };
        const model = new order_1.OrderModel;
        try {
            const order = await model.create(o);
            res.json(order);
        }
        catch (error) {
            res.json(error);
        }
    }
}
exports.OrdersController = OrdersController;
