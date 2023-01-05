import { Router } from "express";
import { signUpController } from "./sign-up.controller";
import { signUpValidator } from "./sign-up.validation";

const router = Router();

router.route("/").post(signUpValidator, signUpController);

export { router as SignUpRouter };
