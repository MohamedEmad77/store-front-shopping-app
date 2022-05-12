"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyAuthToken = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
dotenv_1.default.config();
const secret = process.env.TOKEN_SECRET || '';
const verifyAuthToken = (req, res, next) => {
    try {
        const outhHeader = req.headers.authorization || '';
        const token = outhHeader.split(' ')[1];
        jsonwebtoken_1.default.verify(token, secret);
        next();
    }
    catch (error) {
        return res.json('please login first');
    }
};
exports.verifyAuthToken = verifyAuthToken;
