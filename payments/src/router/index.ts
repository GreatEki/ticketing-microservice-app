import { Router } from "express";
import { ChargeRouter } from "../lib/charge/charge.router";

const AppRouter = Router();

AppRouter.use("/", ChargeRouter);

export { AppRouter };
