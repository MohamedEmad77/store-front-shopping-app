import expres, {Request, Response} from 'express';
import {Product, ProductModel} from '../models/product';


export class ProductsController {
    
    async index (req : Request, res : Response) {
        const model = new ProductModel;
        try {
            const products = await model.index();
            res.json(products);  
        } catch (error) {
            res.json(error); 
        }

    }

    async show (req : Request, res : Response) {
        const model = new ProductModel;
        try {
            const product = await model.show(req.body.id);
            res.json(product);            
        } catch (error) {
            res.json(error); 
        }

    }

    async create (_req : Request, res : Response) {
        // console.log(_req.body)
        const p : Product = {
            name : _req.body.name,
            price: _req.body.price,
            category : _req.body.category
        };
        const model = new ProductModel;
        try {
            const product = await model.create(p);
            res.json(product);            
        } catch (error) {
            res.json(error);
        }

    }

}
