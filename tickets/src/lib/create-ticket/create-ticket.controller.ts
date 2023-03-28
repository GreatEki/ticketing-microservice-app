import { Request, RequestHandler, Response, NextFunction } from "express";
import Ticket from "../../model/Ticket";

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

    return res.status(201).send(ticket);
  } catch (err) {
    next(err);
  }
};

export default createTicketController;
