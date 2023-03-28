import { Router } from "express";
import CreateTicketRouter from "../lib/create-ticket/create-ticket.router";
import GetTicketRouter from "../lib/get-tickets/get-tickets.router";

const router = Router();

router.use("/create", CreateTicketRouter);
router.use("/show", GetTicketRouter);

export { router as AppRouter };
