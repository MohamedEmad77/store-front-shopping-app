"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userCreationValidation = void 0;
const joi_1 = __importDefault(require("joi"));
const userCreationValidation = (data) => {
    const schema = joi_1.default.object().keys({
        firstName: joi_1.default.string().min(3).required(),
        lastName: joi_1.default.string().min(3).required(),
        email: joi_1.default.string().email().required(),
        password: joi_1.default.string().min(6),
    });
    return schema.validate(data);
};
exports.userCreationValidation = userCreationValidation;
