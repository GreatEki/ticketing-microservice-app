import { Router } from "express";
import CreateTicketRouter from "../lib/create-ticket/create-ticket.router";
import GetTicketRouter from "../lib/get-tickets/get-tickets.router";
import UpdateTicketRouter from "../lib/update-ticket/update-ticket.router";

const router = Router();

router.use("/create", CreateTicketRouter);
router.use("/show", GetTicketRouter);
router.use("/update", UpdateTicketRouter);

export { router as AppRouter };
