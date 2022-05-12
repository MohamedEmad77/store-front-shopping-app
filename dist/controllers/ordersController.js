"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrdersController = void 0;
const order_1 = require("../models/order");
const userServices_1 = require("../services/userServices");
const productServices_1 = require("../services/productServices");
const genericServices_1 = require("../services/genericServices");
const orderValidation_1 = require("../validations/orderValidation");
const orderServices_1 = require("../services/orderServices");
class OrdersController {
    async index(req, res) {
        const model = new order_1.OrderModel();
        try {
            const orders = await model.index();
            return res.json(orders);
        }
        catch (error) {
            //res.status(400)
            return res.json(error);
        }
        return;
    }
    async show(req, res) {
        const model = new order_1.OrderModel();
        try {
            const order = await model.show(req.params.id);
            return res.json(order);
        }
        catch (error) {
            //res.status(400)
            return res.json(error);
        }
        return;
    }
    async find_active_order_by_user(req, res) {
        const model = new order_1.OrderModel();
        try {
            const order = await model.find_active_order_by_user(req.params.id);
            res.json(order);
            return order;
        }
        catch (error) {
            //res.status(400)
            return res.json(error);
        }
        return;
    }
    async get_order_details(req, res) {
        const model = new order_1.OrderModel();
        try {
            const order = await model.find_active_order_by_user(req.params.id);
            if (!order)
                return res.json('Please be sure you have an active order');
            //console.log(order);
            const id = order.id?.toString();
            const orders = await (0, orderServices_1.get_order_details)(id);
            //console.log(orders);
            return res.json(orders);
        }
        catch (error) {
            //res.status(400)
            return res.json(error);
        }
        return;
    }
    async create(_req, res) {
        //console.log(_req.body.user_id);
        const model = new order_1.OrderModel();
        const check = await model.find_active_order_by_user((0, userServices_1.getAuthenticatedUser)(_req, res));
        if (check) {
            res.status(405);
            return res.json('You already have an active order');
        }
        const o = {
            user_id: parseInt((0, userServices_1.getAuthenticatedUser)(_req, res)),
            status: 'active',
        };
        try {
            const order = await model.create(o);
            res.status(201);
            return res.json(order);
        }
        catch (error) {
            //res.status(303);
            return res.json(error);
        }
        return;
    }
    async update(_req, res) {
        const model = new order_1.OrderModel();
        try {
            const order = await model.update(_req.params.id);
            res.status(200);
            return res.json(order);
        }
        catch (error) {
            //res.status(204);
            return res.json(error);
        }
        return res.json('');
    }
    async addProduct(_req, res) {
        const orderId = _req.params.id;
        let productId = _req.body.product_id;
        const quantity = parseInt(_req.body.quantity);
        const validationError = (0, orderValidation_1.orderValidation)(quantity);
        if (validationError.error) {
            res.status(405);
            return res.json(validationError.error?.details[0].message);
        }
        if (!(0, genericServices_1.check_if_id_is_valid)(productId)) {
            res.status(405);
            return res.json('please enter a valid product');
        }
        productId = Number.parseInt(productId).toString();
        if (!(await (0, productServices_1.check_if_product_exist)(productId))) {
            res.status(405);
            return res.json('please enter a valid product');
        }
        if (await (0, orderServices_1.check_if_product_and_order_exist)(orderId, productId)) {
            res.status(405);
            return res.json('Already Exist!!');
        }
        const model = new order_1.OrderModel();
        const order = await model.find_active_order_by_user((0, userServices_1.getAuthenticatedUser)(_req, res));
        if (order.id?.toString() != orderId) {
            res.status(405);
            return res.json('please select an active order');
        }
        try {
            const addedProduct = await model.addProduct(quantity, orderId, productId);
            res.status(201);
            return res.json(addedProduct);
        }
        catch (err) {
            //res.status(400);
            return res.json(err);
        }
        return;
    }
}
exports.OrdersController = OrdersController;
