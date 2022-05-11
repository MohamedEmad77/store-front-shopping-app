"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductsController = void 0;
const product_1 = require("../models/product");
const productsValidation_1 = require("../validations/productsValidation");
class ProductsController {
    async index(req, res) {
        const model = new product_1.ProductModel();
        try {
            const products = await model.index();
            res.json(products);
        }
        catch (error) {
            res.json(error);
        }
    }
    async show(req, res) {
        const model = new product_1.ProductModel();
        try {
            const product = await model.show(req.params.id);
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
        };
        const validationError = (0, productsValidation_1.productCreationValidation)(p);
        if (validationError.error) {
            // console.log(validationError.error?.details[0].message);
            return res.json(validationError.error?.details[0].message);
        }
        const model = new product_1.ProductModel();
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
