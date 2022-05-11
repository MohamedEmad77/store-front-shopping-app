import expres, { Request, Response } from 'express';
import { UsersController } from '../controllers/usersController';
import { verifyAuthToken } from '../middlewares/auth';

const controller = new UsersController();
const user_routes = (app: expres.Application) => {
  app.get('/users', verifyAuthToken, controller.index);
  app.post('/users', controller.create);
  app.get('/users/:id', verifyAuthToken, controller.show);
  //app.delete('/users/', controller.delete);
  app.post('/users/signin', controller.signIn);
};

export default user_routes;
