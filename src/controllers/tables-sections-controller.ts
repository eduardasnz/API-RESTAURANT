import { Request, Response, NextFunction } from "express";
import  { z }  from "zod"
import { knex } from "../database/knex";
import { AppError } from "../utils/AppError";

export class TableSessionController {
  async create(request: Request, response: Response, next: NextFunction){
    try {
     
      const bodySchema = z.object({
        table_id: z.number(),
      })

      const { table_id } = bodySchema.parse(request.body)

      const session = await knex<TableSessionRepository>('table_session').where({
        table_id, 
      }).orderBy('opened_at', "desc").first()

      if(session && !session.closed_at){
        throw new AppError('Table session already opened', 400)
      }

      await knex<TableSessionRepository>('table_session').insert({
        table_id,
        opened_at: knex.fn.now()
      })

      response.status(201).json({ message: 'Table session created' })
    } catch (error) {
      next(error);
    }
  }

  async index(request: Request, response: Response, next: NextFunction){
    try {
      const sessions = await knex<TableSessionRepository>('table_session')
      .orderBy('closed_at', "desc")

      response.status(200).json({ tables: sessions })
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
    
      const session = await knex<TableSessionRepository>('table_session').where({id}).first()

      if(!session) {
        throw new AppError('Session table not found. ⚠️', 404);
      }

      if(session.closed_at){
        throw new AppError('Session table already closed. ⚠️', 400);
      }

      await knex<TableSessionRepository>('table_session').where({ id }).update({
        closed_at: knex.fn.now()
      })

      response.status(200).json({ message: 'session table closed.' })
    } catch (error) {
      next(error);
    }
  }
}
