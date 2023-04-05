import { RequestHandler, Request, Response, NextFunction } from "express";

export const createOrderController: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
  } catch (err) {
    next(err);
  }
};
