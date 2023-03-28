import { RequestHandler, Request, Response, NextFunction } from "express";
import Ticket from "../../model/Ticket";
import {
  UnauthorizedError,
  NotFoundError,
} from "@greateki-ticket-ms-demo/common";

export const updateTicket: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { ticketId } = req.params;

    const { title, price } = req.body;

    const ticket = await Ticket.findById(ticketId);

    if (!ticket) throw new NotFoundError("Ticket not found");

    if (ticket.userId !== req.currentUser!.id)
      throw new UnauthorizedError(
        "You are not authorized to perform this operation"
      );

    const updatedTicket = await ticket.updateOne({ title, price });

    return res.status(200).send(updatedTicket);
  } catch (err) {
    next(err);
  }
};
