import expres, { Request, Response } from 'express';
import { User, UserModel } from '../models/user';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import { userCreationValidation } from '../validations/usersValidation';
import { check_if_email_exists } from '../services/userServices';

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

    if (await check_if_email_exists(u.email))
      return res.json('Email already exist');

    u.password = bcrypt.hashSync(
      _req.body.password + pepper,
      parseInt(saltRounds)
    );
    const model = new UserModel();
    try {
      const user = await model.create(u);
      const token = jwt.sign({ user: user }, secret);
      res.json(token);
    } catch (error) {
      res.json(error);
    }
  }

  async delete(req: Request, res: Response) {
    const model = new UserModel();
    const users = await model.delete();
    res.json(users);
  }

  async signIn(req: Request, res: Response) {
    const model = new UserModel();
    const user = await model.find_by_email(req.body.email);
    if (user) {
      if (bcrypt.compareSync(req.body.password + pepper, user.password)) {
        const token = jwt.sign({ user: user }, secret);
        res.json(token);
      } else res.json('Invalid credentials');
    } else {
      res.json('Invalid credentials');
    }
  }
}
