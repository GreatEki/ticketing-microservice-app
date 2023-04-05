import { Router } from "express";
import * as controller from "./get-orders.controller";

const GetOrderRouter = Router();

GetOrderRouter.route("/").post(controller.getOrdersController);
GetOrderRouter.route("/:orderId").post(controller.getOrderController);

export default GetOrderRouter;
