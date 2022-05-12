"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.signup = exports.signin = exports.check_if_email_exists = exports.getAuthenticatedUser = void 0;
const user_1 = require("../models/user");
const dotenv_1 = __importDefault(require("dotenv"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcrypt_1 = __importDefault(require("bcrypt"));
dotenv_1.default.config();
const saltRounds = process.env.SALT_ROUNDS || '';
const pepper = process.env.BCRYPT_PASSWORD || '';
const secret = process.env.TOKEN_SECRET || '';
const getAuthenticatedUser = (req, res) => {
    try {
        const outhHeader = req.headers.authorization || '';
        const token = outhHeader.split(' ')[1];
        const decoded = jsonwebtoken_1.default.verify(token, secret);
        return decoded.user.id;
    }
    catch (error) {
        res.json('please login first');
    }
};
exports.getAuthenticatedUser = getAuthenticatedUser;
const check_if_email_exists = async (email) => {
    const model = new user_1.UserModel();
    const user = await model.find_by_email(email);
    if (user)
        return true;
    return false;
};
exports.check_if_email_exists = check_if_email_exists;
const signin = async (email, password) => {
    const model = new user_1.UserModel();
    const user = await model.find_by_email(email);
    if (user) {
        if (bcrypt_1.default.compareSync(password + pepper, user.password)) {
            const token = jsonwebtoken_1.default.sign({ user: user }, secret);
            return token;
        }
        else
            return null;
    }
    else {
        return null;
    }
};
exports.signin = signin;
const signup = async (u) => {
    if (await (0, exports.check_if_email_exists)(u.email))
        return 'Email already exist';
    u.password = bcrypt_1.default.hashSync(u.password + pepper, parseInt(saltRounds));
    const model = new user_1.UserModel();
    try {
        const user = await model.create(u);
        const token = jsonwebtoken_1.default.sign({ user: user }, secret);
        return token;
    }
    catch (error) {
        return error;
    }
};
exports.signup = signup;
