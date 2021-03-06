import supertest from 'supertest';

import app from '../../server';

const request = supertest(app);

describe('users endpoint testing', () => {
  it('index route response staus is 200', async () => {
    const response = await request.get('/users');
    expect(response.status).toBe(200);
  });

  it('create route response staus is 200', async () => {
    const response = await request.post('/users');
    expect(response.status).toBe(200);
  });

  it('show route response staus is 200', async () => {
    const response = await request.get('/users/1');
    expect(response.status).toBe(200);
  });
});

describe('products endpoint testing', () => {
  it('index route response staus is 200', async () => {
    const response = await request.get('/products');
    expect(response.status).toBe(200);
  });

  it('create route response staus is 200', async () => {
    const response = await request.post('/products');
    expect(response.status).toBe(200);
  });

  it('show route response staus is 200', async () => {
    const response = await request.get('/products/1');
    expect(response.status).toBe(200);
  });
});

describe('orders endpoint testing', () => {
  it('active order by user route response staus is 200', async () => {
    const response = await request.get('/orders/users/1');
    expect(response.status).toEqual(200);
  });

  it('add product to order route response staus is 200', async () => {
    const response = await request.post('/orders/1/products');
    expect(response.status).toEqual(200);
  });

  it('add order route response staus is 200', async () => {
    const response = await request.post('/orders');
    expect(response.status).toEqual(200);
  });
  it('update order status route response staus is 200', async () => {
    const response = await request.put('/orders/1');
    expect(response.status).toEqual(200);
  });
});
