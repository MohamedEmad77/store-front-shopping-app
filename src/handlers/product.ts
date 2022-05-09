import expres, {Request, Response} from 'express';
import {ProductsController} from '../controllers/productsController';

const controller = new ProductsController;
const product_routes = (app : expres.Application) => {
    app.get('/products', controller.index);
    app.post('/products', controller.create);
    app.get('/products/:id', controller.show);
}

export default product_routes;