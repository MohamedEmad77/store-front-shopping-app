import { Product, ProductModel } from '../../models/product';

const model = new ProductModel();

describe('Product Model tests', () => {
  it('should have an index method', () => {
    expect(model.index).toBeDefined();
  });

  it('should have a show method', () => {
    expect(model.show).toBeDefined();
  });

  it('should have a create method', () => {
    expect(model.create).toBeDefined();
  });

  it('create method should add a Product', async () => {
    const p: Product = {
      name: 'test product 1',
      price: 25,
    };
    const result: any = await model.create(p);
    expect(result).toEqual({
      id: 1,
      name: 'test product 1',
      price: 25,
    });
  });

  it('create method should add another Product', async () => {
    const p: Product = {
      name: 'test product 2',
      price: 252,
    };
    const result: any = await model.create(p);
    expect(result).toEqual({
      id: 2,
      name: 'test product 2',
      price: 252,
    });
  });

  it('show method should return the correct Product', async () => {
    const result: any = await model.show('1');
    expect(result).toEqual({
      id: 1,
      name: 'test product 1',
      price: 25,
    });

    const result1: any = await model.show('2');
    expect(result1).toEqual({
      id: 2,
      name: 'test product 2',
      price: 252,
    });
  });

  it('index method should return a list of Products', async () => {
    const result: any = await model.index();
    expect(result).toEqual([
      {
        id: 1,
        name: 'test product 1',
        price: 25,
      },
      {
        id: 2,
        name: 'test product 2',
        price: 252,
      },
    ]);
  });
});
