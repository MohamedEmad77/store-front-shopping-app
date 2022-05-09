import expres, {Request, Response} from 'express';
import {User, UserModel} from '../models/user';


export class UsersController {
    
    async index (req : Request, res : Response) {
        const model = new UserModel;
        try {
            const users = await model.index();
            res.json(users); 
        } catch (error) {
            res.json(error);
        }
        const users = await model.index();
        res.json(users);
    }

    async show (req : Request, res : Response) {
        const model = new UserModel;
        try {
            const user = await model.show(req.body.id);
            res.json(user);
        } catch (error) {
            res.json(error);
        }

    }

    async create (_req : Request, res : Response) {
              const u : User = {
            firstName : _req.body.firstName,
            lastName: _req.body.lastName,
            email : _req.body.email,
            password : _req.body.password
        };
        const model = new UserModel;
        try {
            const user = await model.create(u);
            res.json(user); 
        } catch (error) {
            res.json(error); 
        }
 
    }
    
    async delete (req : Request, res : Response) {
        const model = new UserModel;
        const users = await model.delete();
        res.json(users);
    }
}
