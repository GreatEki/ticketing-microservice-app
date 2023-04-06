import { RequestHandler, Request, Response, NextFunction } from "express";
import { Order } from "../../models";
import {
  NotFoundError,
  OrderStatus,
  ForbiddenError,
} from "@greateki-ticket-ms-demo/common";

export const deleteOrderController: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { orderId } = req.params;

    const order = await Order.findById(orderId);

    if (!order) throw new NotFoundError("Order not found");

    if (order.userId !== req.currentUser!.id)
      throw new ForbiddenError(
        "You are not authorized to perform this operation"
      );

    // proceed to soft delete error
    const result = await order.updateOne({ status: OrderStatus.Cancelled });

    return res.status(204).send(result);
  } catch (err) {
    next(err);
  }
};
