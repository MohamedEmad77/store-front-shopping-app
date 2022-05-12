"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const userServices_1 = require("../../services/userServices");
const dotenv_1 = __importDefault(require("dotenv"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcrypt_1 = __importDefault(require("bcrypt"));
dotenv_1.default.config();
const saltRounds = process.env.SALT_ROUNDS || '';
const pepper = process.env.BCRYPT_PASSWORD || '';
const secret = process.env.TOKEN_SECRET || '';
describe("User Services tests", () => {
    it('check email should return true', () => {
        expect((0, userServices_1.check_if_email_exists)('test3@test.com')).toBeTrue;
    });
    it('check email should return false', () => {
        expect((0, userServices_1.check_if_email_exists)('test3@test.com')).toBeFalse;
    });
    it('sign in should return truthy value', () => {
        expect((0, userServices_1.signin)('test@test.com', '123456')).toBeTruthy;
    });
    it('sign in should return falsy value', () => {
        expect((0, userServices_1.signin)('test33@test.com', '123456')).toBeFalsy;
    });
    it('sign in should return falsy value', () => {
        expect((0, userServices_1.signin)('test@test.com', '12345jj6')).toBeFalsy;
    });
    it('sign in should return truthy value', () => {
        expect((0, userServices_1.signin)('test2@test.com', '123456')).toBeTruthy;
    });
    it('sign up should return email already exist', async () => {
        const u = {
            firstName: 'false test',
            lastName: 'false test',
            email: 'test2@test.com',
            password: '123456',
        };
        expect(await (0, userServices_1.signup)(u)).toBe("Email already exist");
    });
    it('sign up should create user and return token', async () => {
        const u = {
            firstName: 'right test',
            lastName: 'right test',
            email: 'testright@test.com',
            password: '123456',
        };
        u.password = bcrypt_1.default.hashSync(u.password + pepper, parseInt(saltRounds));
        const token = await (0, userServices_1.signup)(u);
        const decoded = jsonwebtoken_1.default.verify(token, secret);
        expect(decoded.user.id).toEqual(3);
    });
});
