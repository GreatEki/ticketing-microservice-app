import { RequestHandler, Request, Response, NextFunction } from "express";
import Ticket from "../../model/Ticket";
import { NotFoundError } from "@greateki-ticket-ms-demo/common";

export const getTicket: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { ticketId } = req.params;

    const ticket = await Ticket.findById(ticketId);

    if (!ticket) throw new NotFoundError("Ticket not found");

    return res.status(200).send(ticket);
  } catch (err) {
    next(err);
  }
};

export const getTickets: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const tickets = await Ticket.find({});

    return res.status(200).send(tickets);
  } catch (err) {
    next(err);
  }
};
