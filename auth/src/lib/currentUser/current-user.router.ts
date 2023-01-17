import { Router } from "express";
import { currentUserController } from "./current-user.controller";
import { currentUserMiddleWare } from "../../middlewares/current-user";

const router = Router();

router.route("/").get(currentUserMiddleWare, currentUserController);

export { router as CurrentUserRouter };
