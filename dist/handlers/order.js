"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ordersController_1 = require("../controllers/ordersController");
const auth_1 = require("../middlewares/auth");
const permissions_1 = require("../middlewares/permissions");
const controller = new ordersController_1.OrdersController();
const order_routes = (app) => {
    app.get('/orders', auth_1.verifyAuthToken, controller.index);
    app.post('/orders', auth_1.verifyAuthToken, controller.create);
    app.get('/orders/:id', auth_1.verifyAuthToken, controller.show);
    app.get('/orders/users/:id', auth_1.verifyAuthToken, controller.get_order_details);
    app.get('/orders/users/:id/active', auth_1.verifyAuthToken, controller.find_active_order_by_user);
    app.post('/orders/:id/products', permissions_1.only_order_creator_can_modify, controller.addProduct);
    app.put('/orders/:id', permissions_1.only_order_creator_can_modify, controller.update);
};
exports.default = order_routes;
