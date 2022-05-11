"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.productCreationValidation = void 0;
const joi_1 = __importDefault(require("joi"));
const productCreationValidation = (data) => {
    const schema = joi_1.default.object().keys({
        name: joi_1.default.string().min(3).required(),
        price: joi_1.default.number().integer().required(),
    });
    return schema.validate(data);
};
exports.productCreationValidation = productCreationValidation;
