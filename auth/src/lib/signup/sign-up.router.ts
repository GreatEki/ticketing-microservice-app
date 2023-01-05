import { Router } from "express";
import { signUpController } from "./sign-up.controller";

const router = Router();

router.route("/").post(signUpController);

export { router as SignUpRouter };
