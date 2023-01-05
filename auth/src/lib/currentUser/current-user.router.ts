import { Router } from "express";
import { currentUserController } from "./current-user.controller";

const router = Router();

router.route("/").get(currentUserController);

export { router as CurrentUserRouter };
