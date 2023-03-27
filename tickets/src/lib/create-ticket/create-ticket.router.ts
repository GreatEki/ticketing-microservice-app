import { Router } from "express";
import { requireAuth } from "@greateki-ticket-ms-demo/common";
import { CreateTicketValidator } from "./create-ticket.validator";

const CreateTicketRouter = Router();

CreateTicketRouter.route("/").post(requireAuth, CreateTicketValidator);

export default CreateTicketRouter;
