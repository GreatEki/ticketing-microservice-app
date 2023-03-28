import { Router } from "express";
import { requireAuth } from "@greateki-ticket-ms-demo/common";
import { updateTicket } from "./update-ticket.controller";

const UpdateTicketRouter = Router();

UpdateTicketRouter.route("/:ticketId").put(requireAuth, updateTicket);

export default UpdateTicketRouter;
