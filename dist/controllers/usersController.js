"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersController = void 0;
const user_1 = require("../models/user");
class UsersController {
    async index(req, res) {
        const model = new user_1.UserModel;
        try {
            const users = await model.index();
            res.json(users);
        }
        catch (error) {
            res.json(error);
        }
        const users = await model.index();
        res.json(users);
    }
    async show(req, res) {
        const model = new user_1.UserModel;
        try {
            const user = await model.show(req.body.id);
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
            password: _req.body.password
        };
        const model = new user_1.UserModel;
        try {
            const user = await model.create(u);
            res.json(user);
        }
        catch (error) {
            res.json(error);
        }
    }
    async delete(req, res) {
        const model = new user_1.UserModel;
        const users = await model.delete();
        res.json(users);
    }
}
exports.UsersController = UsersController;
