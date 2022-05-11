"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.orderValidation = void 0;
const joi_1 = __importDefault(require("joi"));
const orderValidation = (quantity) => {
    const schema = joi_1.default.object().keys({
        quantity: joi_1.default.number().integer().required(),
    });
    return schema.validate({ quantity: quantity });
};
exports.orderValidation = orderValidation;
