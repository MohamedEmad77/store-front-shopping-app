"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ordersController_1 = require("../controllers/ordersController");
const controller = new ordersController_1.OrdersController;
const order_routes = (app) => {
    app.get('/orders', controller.index);
    app.post('/orders', controller.create);
    app.get('/orders/:id', controller.show);
};
exports.default = order_routes;
