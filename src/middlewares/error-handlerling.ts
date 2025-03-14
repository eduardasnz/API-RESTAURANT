import { AppError } from "../utils/AppError";
import { Request, Response, NextFunction } from "express";
import { ZodError } from "zod"

export function ErrorHandling(error: any, request: Request, response: Response, _: NextFunction): void {
  
  if(error instanceof AppError) {
    response.status(error.statusCode).json({ status: "error", message: error.message});
  }

  if(error instanceof ZodError) {
    response.status(400).json({ message: "Validation error ⚠️", issues: error.format()});
  }

  response.status(500).json({ error: "Internal Server Error⚠️" });
}