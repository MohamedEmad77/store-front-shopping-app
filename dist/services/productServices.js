"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.check_if_product_exist = void 0;
const product_1 = require("../models/product");
const check_if_product_exist = async (id) => {
    const model = new product_1.ProductModel();
    const product = await model.show(id);
    if (product)
        return true;
    return false;
};
exports.check_if_product_exist = check_if_product_exist;
