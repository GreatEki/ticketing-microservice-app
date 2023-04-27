import { RequestHandler, Request, Response, NextFunction } from "express";
import Ticket from "../../model/Ticket";
import {
  UnauthorizedError,
  NotFoundError,
  BadRequestError,
} from "@greateki-ticket-ms-demo/common";
import { natsWrapper } from "../../events/nats-wrapper";
import TicketUpdatedPublisher from "../../events/publishers/TicketUpdatedPublisher";
import { mongooseConnection } from "../../config/database";

export const updateTicket: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const session = await mongooseConnection.startSession();
  try {
    const { ticketId } = req.params;

    const { title, price } = req.body;

    const ticket = await Ticket.findById(ticketId);

    if (!ticket) throw new NotFoundError("Ticket not found");

    // check if ticket has an order
    if (ticket.orderId)
      throw new BadRequestError(
        "Ticket is currently reserved. Operation disallowed"
      );

    if (ticket.userId != req.currentUser!.id)
      throw new UnauthorizedError(
        "You are not authorized to perform this operation"
      );

    const result = await ticket.updateOne({ title, price });

    new TicketUpdatedPublisher(natsWrapper.client).publish({
      id: result.id,
      price: result.price,
      title: result.title,
      userId: result.userId,
      version: result.version,
    });

    return res.status(200).send(result);
  } catch (err) {
    next(err);
  }
};
