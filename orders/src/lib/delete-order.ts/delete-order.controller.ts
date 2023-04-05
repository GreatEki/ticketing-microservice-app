import { RequestHandler, Request, Response, NextFunction } from "express";

export const deleteOrderController: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
  } catch (err) {
    next(err);
  }
};
