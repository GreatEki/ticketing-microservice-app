import { Router } from "express";
import * as controller from "./delete-order.controller";
import { requireAuth } from "@greateki-ticket-ms-demo/common";

const DeleteOrderRouter = Router();

DeleteOrderRouter.route("/").post(
  requireAuth,
  controller.deleteOrderController
);

export default DeleteOrderRouter;
