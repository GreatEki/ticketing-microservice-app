import { Request, Response, NextFunction } from "express";
import { ApplicationError } from "../errors";

export const errorHandler = async (
  err: ApplicationError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  res.status(err.statusCode).send({
    message: err.message,
  });
};
