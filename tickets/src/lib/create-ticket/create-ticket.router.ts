import { Router } from "express";

const CreateTicketRouter = Router();

CreateTicketRouter.route("/").post();

export default CreateTicketRouter;
