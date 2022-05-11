"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductModel = void 0;
const database_1 = __importDefault(require("../database"));
class ProductModel {
    async index() {
        try {
            const conn = await database_1.default.connect();
            const sql = 'SELECT * FROM products';
            const result = await conn.query(sql);
            conn.release();
            return result.rows;
        }
        catch (error) {
            throw new Error(`Could not get products. Error: ${error}`);
        }
    }
    async show(id) {
        try {
            const conn = await database_1.default.connect();
            const sql = 'SELECT * FROM products WHERE id = ($1)';
            const result = await conn.query(sql, [id]);
            conn.release();
            return result.rows[0];
        }
        catch (error) {
            throw new Error(`Could not get product. Error: ${error}`);
        }
    }
    async create(p) {
        try {
            const conn = await database_1.default.connect();
            const sql = 'INSERT INTO products (name, price) VALUES($1, $2) RETURNING *';
            const result = await conn.query(sql, [p.name, p.price]);
            conn.release();
            const product = result.rows[0];
            return product;
        }
        catch (error) {
            throw new Error(`Could not create product. Error: ${error}`);
        }
    }
}
exports.ProductModel = ProductModel;
