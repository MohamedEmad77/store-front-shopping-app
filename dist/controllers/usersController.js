"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersController = void 0;
const user_1 = require("../models/user");
const dotenv_1 = __importDefault(require("dotenv"));
const usersValidation_1 = require("../validations/usersValidation");
const userServices_1 = require("../services/userServices");
dotenv_1.default.config();
const saltRounds = process.env.SALT_ROUNDS || '';
const pepper = process.env.BCRYPT_PASSWORD || '';
const secret = process.env.TOKEN_SECRET || '';
class UsersController {
    async index(req, res) {
        const model = new user_1.UserModel();
        try {
            const users = await model.index();
            res.json(users);
        }
        catch (error) {
            res.json(error);
        }
    }
    async show(req, res) {
        const model = new user_1.UserModel();
        try {
            const user = await model.show(req.params.id);
            res.json(user);
        }
        catch (error) {
            res.json(error);
        }
    }
    async create(_req, res) {
        const u = {
            firstName: _req.body.firstName,
            lastName: _req.body.lastName,
            email: _req.body.email,
            password: _req.body.password,
        };
        const validationError = (0, usersValidation_1.userCreationValidation)(u);
        if (validationError.error) {
            // console.log(validationError.error?.details[0].message);
            return res.json(validationError.error?.details[0].message);
        }
        try {
            const result = await (0, userServices_1.signup)(u);
            res.json(result);
        }
        catch (error) {
            res.json(error);
        }
    }
    async delete(req, res) {
        const model = new user_1.UserModel();
        try {
            const users = await model.delete();
            res.json(users);
        }
        catch (error) {
            res.json(error);
        }
    }
    async signIn(req, res) {
        try {
            const token = await (0, userServices_1.signin)(req.body.email, req.body.password);
            //console.log(token);
            if (token)
                return res.json(token);
            else
                return res.json('Invalid credentials');
        }
        catch (error) {
            res.json(error);
        }
    }
}
exports.UsersController = UsersController;
