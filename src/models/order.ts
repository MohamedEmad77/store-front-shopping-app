import Client from "../database";

export type Order = {
    id?: number,
    user_id: number,
    status: string
};

export class OrderModel {

    async index() : Promise<Order[]> {
        try {
           const conn = await Client.connect() ;
           const sql = 'SELECT * FROM orders';
           const result = await conn.query(sql);
           conn.release();
           return result.rows;
        } catch (error) {
            throw new Error(`Could not get orders. Error: ${error}`)
        }
    } 
    
    async  show(id : string) : Promise <Order> {

        try {
            const conn = await Client.connect() ;
            const sql = 'SELECT * FROM orders WHERE id = ($1)';
            const result = await conn.query(sql, [id]);
            conn.release();
            return result.rows[0];
        } catch (error) {
            throw new Error(`Could not get order. Error: ${error}`);
        }
        
    }   
    
    async  create(o : Order) : Promise <Order> {

        try {
            const conn = await Client.connect() ;
            const sql = 'INSERT INTO orders (user_id) VALUES($1) RETURNING *';
            const result = await conn.query(sql, [o.user_id]);
            conn.release();
            const order = result.rows[0];
            return order;
        } catch (error) {
            throw new Error(`Could not create order. Error: ${error}`);
        }
        
    }    
}