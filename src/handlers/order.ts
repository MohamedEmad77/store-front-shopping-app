import expres, {Request, Response} from 'express';
import {OrdersController} from '../controllers/ordersController';

const controller = new OrdersController;
const order_routes = (app : expres.Application) => {
    app.get('/orders', controller.index);
    app.post('/orders', controller.create);
    app.get('/orders/:id', controller.show);
}

export default order_routes;