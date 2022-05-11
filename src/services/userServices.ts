import express, { Request, Response } from 'express';
import { User, UserModel } from '../models/user';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';

dotenv.config();

const secret: string = process.env.TOKEN_SECRET || '';

export const getAuthenticatedUser = (req: Request, res: Response) => {
  try {
    const outhHeader: string = req.headers.authorization || '';
    const token = outhHeader.split(' ')[1];
    const decoded: any = jwt.verify(token, secret);
    return decoded.user.id;
  } catch (error) {
    res.json('please login first');
  }
};

export const check_if_email_exists = async (email: string) => {
  const model = new UserModel();
  const user = await model.find_by_email(email);
  if (user) return true;
  return false;
};
