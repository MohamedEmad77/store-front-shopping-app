"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const usersController_1 = require("../controllers/usersController");
const controller = new usersController_1.UsersController;
const user_routes = (app) => {
    app.get('/users', controller.index);
    app.post('/users', controller.create);
    app.get('/users/:id', controller.show);
    app.delete('/users/', controller.delete);
};
exports.default = user_routes;
