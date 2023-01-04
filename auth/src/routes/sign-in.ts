import { Router } from "express";
import { signInController } from "../controllers/sign-in.controller";

const router = Router();

router.route("/").get(signInController);

export { router as SignInRouter };
