import { Router } from "express";
import { signInController } from "./sign-in.controller";

const router = Router();

router.route("/").post(signInController);

export { router as SignInRouter };
