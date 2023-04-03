import { Request, RequestHandler, Response, NextFunction } from "express";
import Ticket from "../../model/Ticket";
import TicketCreatedPublisher from "../../events/publishers/TicketCreatedPublisher";
import { natsWrapper } from "../../events/nats-wrapper";

const createTicketController: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { title, price } = req.body;

    const ticket = Ticket.buildNewDocument({
      title,
      price,
      userId: req.currentUser!.id,
    });

    await ticket.save();

    new TicketCreatedPublisher(natsWrapper.client).publish({
      id: ticket.id,
      title: ticket.title,
      price: ticket.price,
      userId: ticket.userId,
    });

    return res.status(201).send(ticket);
  } catch (err) {
    next(err);
  }
};

export default createTicketController;
