import { RequestHandler, Request, Response, NextFunction } from "express";
import { Order } from "../../models";

export const getOrdersController: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const orders = await Order.find({
      userId: req.currentUser!.id,
    }).populate("ticket");

    return res.status(200).send(orders);
  } catch (err) {
    next(err);
  }
};

export const getOrderController: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
  } catch (err) {
    next(err);
  }
};
