import { Router } from "express";
import CreateTicketRouter from "../lib/create-ticket/create-ticket.router";

const router = Router();

router.use("/create", CreateTicketRouter);

export { router as AppRouter };
