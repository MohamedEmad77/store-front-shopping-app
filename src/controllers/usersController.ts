import expres, { Request, Response } from 'express';
import { User, UserModel } from '../models/user';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import { userCreationValidation } from '../validations/usersValidation';
import { check_if_email_exists, signin, signup } from '../services/userServices';

dotenv.config();
const saltRounds: string = process.env.SALT_ROUNDS || '';
const pepper: string = process.env.BCRYPT_PASSWORD || '';
const secret: string = process.env.TOKEN_SECRET || '';

export class UsersController {
  async index(req: Request, res: Response) {
    const model = new UserModel();
    try {
      const users = await model.index();
      res.json(users);
    } catch (error) {
      res.json(error);
    }
  }

  async show(req: Request, res: Response) {
    const model = new UserModel();
    try {
      const user = await model.show(req.params.id);
      res.json(user);
    } catch (error) {
      res.json(error);
    }
  }

  async create(_req: Request, res: Response) {
    const u: User = {
      firstName: _req.body.firstName,
      lastName: _req.body.lastName,
      email: _req.body.email,
      password: _req.body.password,
    };
    const validationError = userCreationValidation(u);

    if (validationError.error) {
      // console.log(validationError.error?.details[0].message);
      return res.json(validationError.error?.details[0].message);
    }
    const result = await signup(u);
    res.json(result);

  }

  async delete(req: Request, res: Response) {
    const model = new UserModel();
    const users = await model.delete();
    res.json(users);
  }

  async signIn(req: Request, res: Response) {

    const token = await signin(req.body.email, req.body.password);
    //console.log(token);
    if(token) return res.json(token);
    else return res.json('Invalid credentials');
  }
}
 