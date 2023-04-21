import { Request, Response, NextFunction } from "express";
import { Order } from "../../models";
import {
  BadRequestError,
  NotFoundError,
  OrderStatus,
  UnauthorizedError,
} from "@greateki-ticket-ms-demo/common";

export const chargeUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { token, orderId } = req.body;

    const order = await Order.findById(orderId);

    if (!order) throw new NotFoundError("Order not found");

    //    confirm user intendin g to pay is user who created order
    if (order.userId !== req.currentUser!.id)
      throw new UnauthorizedError("Unauthorized user");

    if (order.status === OrderStatus.Cancelled)
      throw new BadRequestError("This order has been cancelled");
  } catch (err) {
    next(err);
  }
};
