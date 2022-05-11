import { Product, ProductModel } from '../models/product';

export const check_if_product_exist = async (id: string) => {
  const model = new ProductModel();
  const product = await model.show(id);
  if (product) return true;
  return false;
};
