import { Router } from "express";
import * as Controller from "./get-tickets.controller";

const GetTicketRouter = Router();

GetTicketRouter.route("/:ticketId").get(Controller.getTicket);

GetTicketRouter.route("/").get(Controller.getTickets);

export default GetTicketRouter;
