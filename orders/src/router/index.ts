import { Router } from "express";
import CreateOrderRouter from "../lib/create-order/create-order.router";
import DeleteOrderRouter from "../lib/delete-order.ts/delete-order.router";
import GetOrderRouter from "../lib/get-orders/get-orders.router";

const router = Router();

router.use("/create", CreateOrderRouter);
router.use("/delete", DeleteOrderRouter);
router.use("/show", GetOrderRouter);

export { router as AppRouter };
