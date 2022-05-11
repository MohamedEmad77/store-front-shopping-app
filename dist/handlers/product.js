"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const productsController_1 = require("../controllers/productsController");
const auth_1 = require("../middlewares/auth");
const controller = new productsController_1.ProductsController();
const product_routes = (app) => {
    app.get('/products', controller.index);
    app.post('/products', auth_1.verifyAuthToken, controller.create);
    app.get('/products/:id', controller.show);
};
exports.default = product_routes;
