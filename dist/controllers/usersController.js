"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersController = void 0;
const user_1 = require("../models/user");
class UsersController {
    async index(req, res) {
        const model = new user_1.UserModel;
        const users = await model.index();
        res.json(users);
    }
    async show(req, res) {
        const model = new user_1.UserModel;
        const user = await model.show(req.body.id);
        res.json(user);
    }
    async create(_req, res) {
        // console.log(_req.body)
        const u = {
            firstName: _req.body.firstName,
            lastName: _req.body.lastName,
            email: _req.body.email,
            password: _req.body.password
        };
        const model = new user_1.UserModel;
        const user = await model.create(u);
        res.json(user);
    }
    async delete(req, res) {
        const model = new user_1.UserModel;
        const users = await model.delete();
        res.json(users);
    }
}
exports.UsersController = UsersController;
