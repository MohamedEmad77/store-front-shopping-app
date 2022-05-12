"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const order_1 = require("../../models/order");
const orderServices_1 = require("../../services/orderServices");
const model = new order_1.OrderModel();
describe('Order Model tests', () => {
    it('should have an index method', () => {
        expect(model.index).toBeDefined();
    });
    it('should have a show method', () => {
        expect(model.show).toBeDefined();
    });
    it('should have a create method', () => {
        expect(model.create).toBeDefined();
    });
    it('create method should add an Order', async () => {
        const o = {
            user_id: 1,
            status: 'active',
        };
        const result = await model.create(o);
        expect(result).toEqual({
            id: 1,
            user_id: '1',
            status: 'active',
        });
    });
    it('show method should return the correct Order', async () => {
        const result = await model.show('1');
        expect(result).toEqual({
            id: 1,
            user_id: '1',
            status: 'active',
        });
    });
    it('index method should return a list of Orders', async () => {
        const result = await model.index();
        expect(result).toEqual([
            {
                id: 1,
                user_id: '1',
                status: 'active',
            },
        ]);
    });
    it('add product method should add product to an Order', async () => {
        const result = await model.addProduct(10, '1', '1');
        expect(result).toEqual({
            id: 1,
            order_id: '1',
            product_id: '1',
            quantity: 10,
        });
    });
    it('get product details method should return Order details correctly', async () => {
        const result = await (0, orderServices_1.get_order_details)('1');
        expect(result).toEqual([
            {
                order_id: 1,
                product_id: 1,
                product_name: 'test product 1',
                price: 25,
                quantity: 10,
                status: 'active',
            },
        ]);
    });
    it('add product method should add product to an Order', async () => {
        const result = await model.addProduct(500, '1', '2');
        expect(result).toEqual({
            id: 2,
            order_id: '1',
            product_id: '2',
            quantity: 500,
        });
    });
    it('get product details method should return Order details correctly', async () => {
        const result = await (0, orderServices_1.get_order_details)('1');
        expect(result).toEqual([
            {
                order_id: 1,
                product_id: 1,
                product_name: 'test product 1',
                price: 25,
                quantity: 10,
                status: 'active',
            },
            {
                order_id: 1,
                product_id: 2,
                product_name: 'test product 2',
                price: 252,
                quantity: 500,
                status: 'active',
            },
        ]);
    });
    it('update method should return Order with completed status', async () => {
        const result = await model.update('1');
        expect(result).toEqual({
            id: 1,
            user_id: '1',
            status: 'completed',
        });
    });
    it('show method should return the Order with completed status', async () => {
        const result = await model.show('1');
        expect(result).toEqual({
            id: 1,
            user_id: '1',
            status: 'completed',
        });
    });
});
