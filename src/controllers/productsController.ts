import expres, { Request, Response } from 'express';
import { Product, ProductModel } from '../models/product';
import { productCreationValidation } from '../validations/productsValidation';

export class ProductsController {
  async index(req: Request, res: Response) {
    const model = new ProductModel();
    try {
      const products = await model.index();
      res.json(products);
    } catch (error) {
      res.json(error);
    }
  }

  async show(req: Request, res: Response) {
    const model = new ProductModel();
    try {
      const product = await model.show(req.params.id);
      res.json(product);
    } catch (error) {
      res.json(error);
    }
  }

  async create(_req: Request, res: Response) {
    // console.log(_req.body)
    const p: Product = {
      name: _req.body.name,
      price: _req.body.price,
    };
    const validationError = productCreationValidation(p);

    if (validationError.error) {
      // console.log(validationError.error?.details[0].message);
      return res.json(validationError.error?.details[0].message);
    }
    const model = new ProductModel();
    try {
      const product = await model.create(p);
      res.json(product);
    } catch (error) {
      res.json(error);
    }
  }
}
