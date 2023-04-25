import { Request, Response, NextFunction } from "express";
import { Order, Payment } from "../../models";
import {
  BadRequestError,
  NotFoundError,
  OrderStatus,
  UnauthorizedError,
} from "@greateki-ticket-ms-demo/common";
import { stripe } from "../../config/stripe";
import { PaymentCreatedPublisher } from "../../events/publishers/PaymentCreatedPublisher";
import { natsWrapper } from "../../events/nats-wrapper";

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

    const charge = await stripe.charges.create({
      currency: "usd",
      amount: order.price * 100,
      source: token,
    });

    const payment = Payment.buildNewDocument({
      orderId,
      stripeId: charge.id,
    });

    await payment.save();

    new PaymentCreatedPublisher(natsWrapper.client).publish({
      id: payment.id,
      orderId: payment.orderId,
      stripeId: payment.stripeId,
    });

    res.status(201).send({ success: true });
  } catch (err) {
    next(err);
  }
};
