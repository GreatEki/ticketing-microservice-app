import { Router } from "express";
import * as controller from "./delete-order.controller";

const DeleteOrderRouter = Router();

DeleteOrderRouter.route("/").post(controller.deleteOrderController);

export default DeleteOrderRouter;
