import { Router } from "express";
import { signOutController } from "../controllers/sign-out.controller";

const router = Router();

router.route("/").get(signOutController);

export { router as SignOutRouter };
