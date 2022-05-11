import expres, { Request, Response } from 'express';
import { OrdersController } from '../controllers/ordersController';
import { verifyAuthToken } from '../middlewares/auth';
import { only_order_creator_can_modify } from '../middlewares/permissions';

const controller = new OrdersController();
const order_routes = (app: expres.Application) => {
  app.get('/orders', verifyAuthToken, controller.index);
  app.post('/orders', verifyAuthToken, controller.create);
  app.get('/orders/:id', verifyAuthToken, controller.show);
  app.get('/orders/users/:id', verifyAuthToken, controller.get_order_details);
  app.get(
    '/orders/users/:id/active',
    verifyAuthToken,
    controller.find_active_order_by_user
  );
  app.post(
    '/orders/:id/products',
    only_order_creator_can_modify,
    controller.addProduct
  );
  app.put('/orders/:id', only_order_creator_can_modify, controller.update);
};

export default order_routes;
