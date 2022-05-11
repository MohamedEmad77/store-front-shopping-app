"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const usersController_1 = require("../controllers/usersController");
const auth_1 = require("../middlewares/auth");
const controller = new usersController_1.UsersController();
const user_routes = (app) => {
    app.get('/users', auth_1.verifyAuthToken, controller.index);
    app.post('/users', controller.create);
    app.get('/users/:id', auth_1.verifyAuthToken, controller.show);
    //app.delete('/users/', controller.delete);
    app.post('/users/signin', controller.signIn);
};
exports.default = user_routes;
