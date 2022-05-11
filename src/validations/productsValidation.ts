import { Product, ProductModel } from '../models/product';
import joi from 'joi';

export const productCreationValidation = (data: Product) => {
  const schema = joi.object().keys({
    name: joi.string().min(3).required(),
    price: joi.number().integer().required(),
  });

  return schema.validate(data);
};
