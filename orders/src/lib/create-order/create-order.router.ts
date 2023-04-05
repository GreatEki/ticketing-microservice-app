import { Router } from "express";
import * as controller from "./create-order.controller";

const CreateOrderRouter = Router();

CreateOrderRouter.route("/").post(controller.createOrderController);

export default CreateOrderRouter;
