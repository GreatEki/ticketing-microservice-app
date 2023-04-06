import { RequestHandler, Request, Response, NextFunction } from "express";
import { Order } from "../../models";
import {
  NotFoundError,
  UnauthorizedError,
} from "@greateki-ticket-ms-demo/common";

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
    const { orderId } = req.params;

    const order = await Order.findById(orderId).populate("ticket");

    if (!order) throw new NotFoundError("Order not found");

    if (order.userId !== req.currentUser!.id)
      throw new UnauthorizedError("You are not authorized to view this order");

    return res.status(200).send(order);
  } catch (err) {
    next(err);
  }
};
