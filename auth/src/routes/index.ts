import { Router } from "express";
import { CurrentUserRouter } from "../lib/currentUser/current-user.router";
import { SignInRouter } from "../lib/signin/sign-in.router";
import { SignOutRouter } from "../lib/signout/sign-out.router";
import { SignUpRouter } from "../lib/signup/sign-up.router";

const router = Router();

router.use("/currentUser", CurrentUserRouter);
router.use("/signin", SignInRouter);
router.use("/signout", SignOutRouter);
router.use("/signup", SignUpRouter);

export default router;
