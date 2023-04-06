import { RequestHandler, Request, Response, NextFunction } from "express";
import { Ticket, Order } from "../../models";
import {
  BadRequestError,
  NotFoundError,
  OrderStatus,
} from "@greateki-ticket-ms-demo/common";
import OrderCreatedPublisher from "../../events/publishers/OrderCreatedPublisher";
import { natsWrapper } from "../../events/nats-wrapper";

// 10seconds * 60seconds
const EXPIRATION_WINDOW_TIME = 10 * 60;

export const createOrderController: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { ticketId } = req.body;
    const ticket = await Ticket.findById(ticketId);

    if (!ticket) throw new NotFoundError("Ticket not found");

    // confirm that the ticket is not reserved or locked in for purchase by another user
    const isReserved = await ticket.isReserved();

    if (isReserved) throw new BadRequestError("Ticket is already locked in");

    const expiration = new Date();
    // set expiration time
    expiration.setSeconds(expiration.getSeconds() + EXPIRATION_WINDOW_TIME);

    const order = Order.buildNewDocument({
      userId: req.currentUser!.id,
      status: OrderStatus.Created,
      expiresAt: expiration,
      ticket: ticket,
    });

    await order.save();

    await new OrderCreatedPublisher(natsWrapper.client).publish({
      id: order.id,
      userId: order.userId,
      expiresAt: order.expiresAt.toISOString(),
      status: OrderStatus.Created,
      ticket: {
        id: ticket.id,
        price: ticket.price,
      },
    });

    return res.status(201).send(order);
  } catch (err) {
    next(err);
  }
};
