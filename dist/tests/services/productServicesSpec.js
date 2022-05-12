"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const productServices_1 = require("../../services/productServices");
describe('Order Services tests', () => {
    it('should return true', async () => {
        const result = await (0, productServices_1.check_if_product_exist)('1');
        expect(result).toBeTrue;
    });
    it('should return false', async () => {
        const result = await (0, productServices_1.check_if_product_exist)('10');
        expect(result).toBeFalse;
    });
});
