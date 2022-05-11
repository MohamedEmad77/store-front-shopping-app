import expres, { Request, Response } from 'express';
import { Order, OrderModel } from '../models/order';
import { getAuthenticatedUser } from '../services/userServices';
import { check_if_product_exist } from '../services/productServices';
import { check_if_id_is_valid } from '../services/genericServices';
import { orderValidation } from '../validations/orderValidation';
import {
  check_if_product_and_order_exist,
  get_order_details,
} from '../services/orderServices';

export class OrdersController {
  async index(req: Request, res: Response) {
    const model = new OrderModel();
    try {
      const orders = await model.index();
      res.json(orders);
    } catch (error) {
      res.json(error);
    }
  }

  async show(req: Request, res: Response) {
    const model = new OrderModel();
    try {
      const order = await model.show(req.params.id);
      res.json(order);
    } catch (error) {
      res.json(error);
    }
  }
  async find_active_order_by_user(req: Request, res: Response) {
    const model = new OrderModel();
    try {
      const order = await model.find_active_order_by_user(req.params.id);
      res.json(order);
      return order;
    } catch (error) {
      res.json(error);
    }
  }

  async get_order_details(req: Request, res: Response) {
    const model = new OrderModel();
    try {
      const order = await model.find_active_order_by_user(req.params.id);
      if(!order) return res.json("Please be sure you have an active order");
      //console.log(order);
      const id = order.id?.toString() as string;
      const orders = await get_order_details(id);
      //console.log(orders);
      res.json(orders);
    } catch (error) {
      res.json(error);
    }
  }
  async create(_req: Request, res: Response) {
    //console.log(_req.body.user_id);
    const model = new OrderModel();
    const check = await model.find_active_order_by_user(
      getAuthenticatedUser(_req, res)
    );
    if (check) {
      return res.json('You already have an active order');
    }
    const o: Order = {
      user_id: parseInt(getAuthenticatedUser(_req, res)),
      status: 'active',
    };

    try {
      const order = await model.create(o);
      res.json(order);
    } catch (error) {
      res.json(error);
    }
  }

  async update(_req: Request, res: Response) {
    const model = new OrderModel();
    try {
      const order = await model.update(_req.params.id);
      res.json(order);
    } catch (error) {
      res.json(error);
    }
  }

  async addProduct(_req: Request, res: Response) {
    const orderId: string = _req.params.id;
    let productId: string = _req.body.product_id;
    const quantity: number = parseInt(_req.body.quantity);
    const validationError = orderValidation(quantity);
    if (validationError.error) {
      return res.json(validationError.error?.details[0].message);
    }
    if (!check_if_id_is_valid(productId)) {
      return res.json('please enter a valid product');
    }
    productId = Number.parseInt(productId).toString();
    if (!(await check_if_product_exist(productId))) {
      return res.json('please enter a valid product');
    }

    if (await check_if_product_and_order_exist(orderId, productId)) {
      return res.json('Already Exist!!');
    }
    const model = new OrderModel();
    const order = await model.find_active_order_by_user(
      getAuthenticatedUser(_req, res)
    );
    if (order.id?.toString() != orderId) {
      return res.json('please select an active order');
    }
    try {
      const addedProduct = await model.addProduct(quantity, orderId, productId);
      res.json(addedProduct);
    } catch (err) {
      res.status(400);
      res.json(err);
    }
  }
}
