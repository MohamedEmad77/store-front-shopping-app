import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';

dotenv.config();

const secret: string = process.env.TOKEN_SECRET || '';

export const verifyAuthToken = (req: Request, res: Response, next: any) => {
  try {
    const outhHeader: string = req.headers.authorization || '';
    const token = outhHeader.split(' ')[1];
    jwt.verify(token, secret);
    next();
  } catch (error) {
    res.json('please login first');
  }
};
