"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const orderServices_1 = require("../../services/orderServices");
describe("Order Services tests", () => {
    it('should return id of order creator', async () => {
        const result = await (0, orderServices_1.get_order_creator)('1');
        expect(result).toEqual('1');
    });
    it('should return true', async () => {
        const result = await (0, orderServices_1.check_if_product_and_order_exist)('1', '1');
        expect(result).toBeTrue;
    });
    it('should return false', async () => {
        const result = await (0, orderServices_1.check_if_product_and_order_exist)('1', '2');
        expect(result).toBeFalse;
    });
});
