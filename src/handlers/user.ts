import expres, {Request, Response} from 'express';
import {UsersController} from '../controllers/usersController';

const controller = new UsersController;
const user_routes = (app : expres.Application) => {
    app.get('/users', controller.index);
    app.post('/users', controller.create);
    app.get('/users/:id', controller.show);
    app.delete('/users/', controller.delete);
}

export default user_routes;