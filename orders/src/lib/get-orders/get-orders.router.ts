import { Router } from "express";
import * as controller from "./get-orders.controller";
import { requireAuth } from "@greateki-ticket-ms-demo/common";

const GetOrderRouter = Router();

GetOrderRouter.route("/").post(requireAuth, controller.getOrdersController);
GetOrderRouter.route("/:orderId").post(controller.getOrderController);

export default GetOrderRouter;
