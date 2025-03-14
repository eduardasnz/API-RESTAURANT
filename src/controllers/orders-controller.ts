import { Request, Response, NextFunction } from "express";
import z from "zod";
import { knex } from "../database/knex";
import { AppError } from "../utils/AppError";

export class OrdersController {
  async create(request: Request, response: Response, next: NextFunction) {
    try {
      const bodySchema = z.object({
        table_session_id: z.number(),
        product_id: z.number(),
        quantity: z.number().int().min(1),
      });

      const { table_session_id, product_id, quantity } = bodySchema.parse(
        request.body
      );

      const session = await knex<TableSessionRepository>("table_session")
        .where({ id: table_session_id })
        .first();

      if (!session) {
        throw new AppError("Table session not found", 404);
      }

      if (session.closed_at) {
        throw new AppError("Table session already closed", 400);
      }

      const productRepository = await knex<ProductRepository>("products")
        .where({ id: product_id })
        .first();

      if (!productRepository) {
        throw new AppError("Product not found", 404);
      }

      await knex<OrderRepository>("orders").insert({
        table_session_id,
        product_id,
        quantity,
        amount: productRepository.price,
      });

      response.status(200).json({ message: "Sucessfully" });
    } catch (error) {
      next(error);
    }
  }

  async index(request: Request, response: Response, next: NextFunction) {
    try {
      const { table_session_id } = request.params;

      const order = await knex("orders")
        .select("orders.id", "orders.table_session_id", "orders.product_id",
          "products.name", "orders.amount",
          "orders.quantity",
          knex.raw("(orders.amount * orders.quantity) AS total"))
        .join("products", "products.id", "orders.product_id")
        .where({ table_session_id })
        .orderBy("orders.created_at")

      response.status(200).json({ order });
    } catch (error) {
      next(error);
    }
  }

  async show(request: Request, response: Response, next: NextFunction) {
    try {
      const { table_session_id } = request.params;

      const order = await knex("orders")
      .select(
        knex.raw('ROUND(SUM(orders.amount  * orders.quantity), 2) AS total'),
        knex.raw('COALESCE(SUM(orders.quantity), 0) AS quantity')
      )
      .where({ table_session_id }).first()

      response.json({ order })
    } catch (error) {
      next(error);
    }
  }
}


/*
  O ROUND é para mostrar apenas 2 casas decimais, tipo. 
  valor normal: 150.90000000
  valor com round: 150.9
*/