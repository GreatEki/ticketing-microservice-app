import { RequestHandler, Request, Response, NextFunction } from "express";
import { Order } from "../../models";
import {
  NotFoundError,
  OrderStatus,
  ForbiddenError,
} from "@greateki-ticket-ms-demo/common";
import OrderCancelledPublisher from "../../events/publishers/OrderCancelledPublisher";
import { natsWrapper } from "../../events/nats-wrapper";

export const deleteOrderController: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { orderId } = req.params;

    const order = await Order.findById(orderId).populate("ticket");

    if (!order) throw new NotFoundError("Order not found");

    if (order.userId !== req.currentUser!.id)
      throw new ForbiddenError(
        "You are not authorized to perform this operation"
      );

    // proceed to soft delete error
    const result = await order.updateOne({ status: OrderStatus.Cancelled });

    await new OrderCancelledPublisher(natsWrapper.client).publish({
      id: result.id,
      status: result.status,
      expiresAt: result.expiresAt,
      userId: result.userId,
      ticket: {
        id: order.ticket.id,
        price: order.ticket.price,
      },
    });

    return res.status(204).send(result);
  } catch (err) {
    next(err);
  }
};
