import { NextFunction, Request, Response } from 'express';
import { knex } from '../database/knex';
import { z } from "zod"
import { AppError } from '../utils/AppError';

class ProductController {
  async index(request: Request, response: Response, next: NextFunction){
    try {
      
      const { name } = request.query

      const products = await knex('products').select().whereLike('name', `%${name ?? ""}%`);

      response.json(products);

    } catch (error) {
      next(error);
    }
  }

  async create(request: Request, response: Response, next: NextFunction){
    try {
      const bodySchema = z.object({
        name: z.string({ message: "Name is required" }).trim(),
        price: z.number({ message: "Price is required" }).gt(0),
      })

      const { name, price } = bodySchema.parse(request.body)

      await knex<ProductRepository>('products').insert({ name, price });

      response.json({ message: 'Product created' });
    } catch (error) {
      next(error);
    }
  }

  async update(request: Request, response: Response, next: NextFunction){
    try {
      const id = z.string().transform((value) => Number(value))
      .refine((value) => !isNaN(value), {
        message: 'Invalid ID',
      })
      .parse(request.params.id)

      const bodySchema = z.object({
        name: z.string().optional(),
        price: z.number().gt(0),
      })

      const product = await knex('products').select().where({ id }).first();

      if(!product){
        throw new AppError('Product not found', 404);
      }

      const { name, price } = bodySchema.parse(request.body)

      await knex<ProductRepository>('products').where({ id }).update({ name, price, updated_at: knex.fn.now() });

      response.json({ message: 'Product updated', name, price });
    } catch (error) {
      next(error);
    }
  }

  async remove(request: Request, response: Response, next: NextFunction){
    try{
      const id = z.string().transform((value) => Number(value))
      .refine((value) => !isNaN(value), {
        message: 'Invalid ID',
      })
      .parse(request.params.id)

      const product = await knex('products').select().where({ id }).first();

      if(!product){
        throw new AppError('Product not found', 404);
      }

      await knex<ProductRepository>('products').where({ id }).delete();

      response.json({ message: 'product remove' })
    } catch (error) {
      next(error);
    }
  }
}

export { ProductController }