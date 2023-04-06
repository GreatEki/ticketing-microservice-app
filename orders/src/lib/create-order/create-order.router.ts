import { Router } from "express";
import * as controller from "./create-order.controller";
import { requireAuth } from "@greateki-ticket-ms-demo/common";

const CreateOrderRouter = Router();

CreateOrderRouter.route("/").post(
  requireAuth,
  controller.createOrderController
);

export default CreateOrderRouter;
