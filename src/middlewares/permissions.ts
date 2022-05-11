import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import { get_order_creator } from '../services/orderServices';
import { getAuthenticatedUser } from '../services/userServices';

dotenv.config();

const secret: string = process.env.TOKEN_SECRET || '';

export const only_order_creator_can_modify = async (
  req: Request,
  res: Response,
  next: any
) => {
  try {
    const authUser = getAuthenticatedUser(req, res);
    const user_id = await get_order_creator(req.params.id);
    //console.log(decoded.user.id, user_id);
    if (authUser != user_id) {
      return res.json("You don't have permissions to perform this action");
    }
    next();
  } catch (error) {
    res.json('please login first');
  }
};
