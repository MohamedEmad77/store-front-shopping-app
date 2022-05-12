"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserModel = void 0;
const database_1 = __importDefault(require("../database"));
class UserModel {
    async delete() {
        try {
            const conn = await database_1.default.connect();
            const sql = 'DELETE FROM users';
            const result = await conn.query(sql);
            conn.release();
            return result.rows;
        }
        catch (error) {
            throw new Error(`Could not get users. Error: ${error}`);
        }
    }
    async show(id) {
        try {
            const conn = await database_1.default.connect();
            const sql = 'SELECT * FROM users WHERE id = ($1)';
            const result = await conn.query(sql, [id]);
            conn.release();
            return result.rows[0];
        }
        catch (error) {
            throw new Error(`Could not get user. Error: ${error}`);
        }
    }
    async find_by_email(email) {
        try {
            const conn = await database_1.default.connect();
            const sql = 'SELECT * FROM users WHERE email = ($1)';
            const result = await conn.query(sql, [email]);
            conn.release();
            return result.rows[0];
        }
        catch (error) {
            throw new Error(`Could not get user. Error: ${error}`);
        }
    }
    async create(u) {
        try {
            // console.log(u);
            const conn = await database_1.default.connect();
            const sql = 'INSERT INTO users (firstName, lastName, email, password) VALUES($1, $2, $3, $4) RETURNING *';
            const result = await conn.query(sql, [
                u.firstName,
                u.lastName,
                u.email,
                u.password,
            ]);
            conn.release();
            const user = result.rows[0];
            return user;
        }
        catch (error) {
            throw new Error(`Could not create user. Error: ${error}`);
        }
    }
    async index() {
        try {
            const conn = await database_1.default.connect();
            const sql = 'SELECT * FROM users';
            const result = await conn.query(sql);
            conn.release();
            return result.rows;
        }
        catch (error) {
            throw new Error(`Could not get users. Error: ${error}`);
        }
    }
}
exports.UserModel = UserModel;
