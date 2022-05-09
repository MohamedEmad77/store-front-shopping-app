"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductsController = void 0;
const product_1 = require("../models/product");
class ProductsController {
    async index(req, res) {
        const model = new product_1.ProductModel;
        try {
            const products = await model.index();
            res.json(products);
        }
        catch (error) {
            res.json(error);
        }
    }
    async show(req, res) {
        const model = new product_1.ProductModel;
        try {
            const product = await model.show(req.body.id);
            res.json(product);
        }
        catch (error) {
            res.json(error);
        }
    }
    async create(_req, res) {
        // console.log(_req.body)
        const p = {
            name: _req.body.name,
            price: _req.body.price,
            category: _req.body.category
        };
        const model = new product_1.ProductModel;
        try {
            const product = await model.create(p);
            res.json(product);
        }
        catch (error) {
            res.json(error);
        }
    }
}
exports.ProductsController = ProductsController;
