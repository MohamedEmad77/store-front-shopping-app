import express, { Request, Response } from 'express';
import { User, UserModel } from '../models/user';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

dotenv.config();
const saltRounds: string = process.env.SALT_ROUNDS || '';
const pepper: string = process.env.BCRYPT_PASSWORD || '';
const secret: string = process.env.TOKEN_SECRET || '';

export const getAuthenticatedUser = (req: Request, res: Response) => {
  try {
    const outhHeader: string = req.headers.authorization || '';
    const token = outhHeader.split(' ')[1];
    const decoded: any = jwt.verify(token, secret);
    return decoded.user.id;
  } catch (error) {
    throw new Error('please login first');
  }
};

export const check_if_email_exists = async (email: string) => {
  const model = new UserModel();
  const user = await model.find_by_email(email);
  if (user) return true;
  return false;
};

export const signin = async (email: string, password: string) => {
  const model = new UserModel();
  const user = await model.find_by_email(email);
  if (user) {
    if (bcrypt.compareSync(password + pepper, user.password)) {
      const token = jwt.sign({ user: user }, secret);
      return token;
    } else return null;
  } else {
    return null;
  }
};

export const signup = async (u: User) => {
  if (await check_if_email_exists(u.email)) return 'Email already exist';

  u.password = bcrypt.hashSync(u.password + pepper, parseInt(saltRounds));
  const model = new UserModel();
  try {
    const user = await model.create(u);
    const token = jwt.sign({ user: user }, secret);
    return token;
  } catch (error) {
    return error;
  }
};
