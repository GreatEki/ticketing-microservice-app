import { Router } from "express";
import { signUpController } from "../controllers/sign-up.controller";

const router = Router();

router.route("/").get(signUpController);

export { router as SignUpRouter };
