import { Router } from "express";
import { signInController } from "./sign-in.controller";
import { signInValidator } from "./sign-in.validation";

const router = Router();

router.route("/").post(signInValidator, signInController);

export { router as SignInRouter };
