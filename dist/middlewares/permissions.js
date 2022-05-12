"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.only_order_creator_can_modify = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
const orderServices_1 = require("../services/orderServices");
const userServices_1 = require("../services/userServices");
dotenv_1.default.config();
const secret = process.env.TOKEN_SECRET || '';
const only_order_creator_can_modify = async (req, res, next) => {
    try {
        const authUser = (0, userServices_1.getAuthenticatedUser)(req, res);
        const user_id = await (0, orderServices_1.get_order_creator)(req.params.id);
        //console.log(decoded.user.id, user_id);
        if (authUser != user_id) {
            return res.json("You don't have permissions to perform this action");
        }
        next();
    }
    catch (error) {
        return res.json('please login first');
    }
};
exports.only_order_creator_can_modify = only_order_creator_can_modify;
