import expres, {Request, Response} from 'express';
import {User, UserModel} from '../models/user';


export class UsersController {
    
    async index (req : Request, res : Response) {
        const model = new UserModel;
        const users = await model.index();
        res.json(users);
    }

    async show (req : Request, res : Response) {
        const model = new UserModel;
        const user = await model.show(req.body.id);
        res.json(user);
    }

    async create (_req : Request, res : Response) {
        // console.log(_req.body)
        const u : User = {
            firstName : _req.body.firstName,
            lastName: _req.body.lastName,
            email : _req.body.email,
            password : _req.body.password
        };
        const model = new UserModel;
        const user = await model.create(u);
        res.json(user);
    }
    
    async delete (req : Request, res : Response) {
        const model = new UserModel;
        const users = await model.delete();
        res.json(users);
    }
}
