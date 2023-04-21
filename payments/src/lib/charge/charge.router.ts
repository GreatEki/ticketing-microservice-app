import { Router } from "express";
import * as controller from "./charge.controller";
import { chargeValidator } from "./charge.validator";
import { requireAuth } from "@greateki-ticket-ms-demo/common";

const router = Router();

router.route("/").post(requireAuth, chargeValidator, controller.chargeUser);

export { router as ChargeRouter };
