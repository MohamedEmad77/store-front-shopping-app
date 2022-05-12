"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const genericServices_1 = require("../../services/genericServices");
describe('Order Services tests', () => {
    it('should return true', async () => {
        const result = await (0, genericServices_1.check_if_id_is_valid)('1');
        expect(result).toBeTrue;
    });
    it('should return false', async () => {
        const result = await (0, genericServices_1.check_if_id_is_valid)('string');
        expect(result).toBeFalse;
    });
});
