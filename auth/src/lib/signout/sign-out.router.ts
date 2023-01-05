import { Router } from "express";
import { signOutController } from "./sign-out.controller";

const router = Router();

router.route("/").post(signOutController);

export { router as SignOutRouter };
