import { Request, Response, NextFunction } from "express";
import { Order } from "../../models";
import {
  BadRequestError,
  NotFoundError,
  OrderStatus,
  UnauthorizedError,
} from "@greateki-ticket-ms-demo/common";
import { stripe } from "../../config/stripe";

export const chargeUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { token, orderId } = req.body;

    const order = await Order.findById(orderId);

    if (!order) throw new NotFoundError("Order not found");

    //    confirm user intending to pay is user who created order
    if (order.userId !== req.currentUser!.id)
      throw new UnauthorizedError("Unauthorized user");

    if (order.status === OrderStatus.Cancelled)
      throw new BadRequestError("This order has been cancelled");

    await stripe.charges.create({
      currency: "usd",
      amount: order.price * 100,
      source: token,
    });

    res.status(201).send({ success: true });
  } catch (err) {
    next(err);
  }
};
