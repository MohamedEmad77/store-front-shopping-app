import expres, {Request, Response} from 'express';
import {Order, OrderModel} from '../models/order';


export class OrdersController {
    
    async index (req : Request, res : Response) {
        const model = new OrderModel;
        try {
            const orders = await model.index();
            res.json(orders);  
        } catch (error) {
            res.json(error); 
        }

    }

    async show (req : Request, res : Response) {
        const model = new OrderModel;
        try {
            const order = await model.show(req.body.id);
            res.json(order);            
        } catch (error) {
            res.json(error); 
        }

    }

    async create (_req : Request, res : Response) {
        //console.log(_req.body.user_id);
        const o : Order = {
            user_id : _req.body.user_id,
            status : 'active'
        };
        const model = new OrderModel;
        try {
            const order = await model.create(o);
            res.json(order);            
        } catch (error) {
            res.json(error);
        }

    }

}
