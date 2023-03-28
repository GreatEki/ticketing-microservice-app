import { Router } from "express";
import { requireAuth } from "@greateki-ticket-ms-demo/common";
import { CreateTicketValidator } from "./create-ticket.validator";
import createTicketController from "./create-ticket.controller";

const CreateTicketRouter = Router();

CreateTicketRouter.route("/").post(
  requireAuth,
  CreateTicketValidator,
  createTicketController
);

export default CreateTicketRouter;
