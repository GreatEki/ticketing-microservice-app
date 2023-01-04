import { Router } from "express";
import { CurrentUserRouter } from "./current-user";
import { SignInRouter } from "./sign-in";
import { SignOutRouter } from "./sign-out";
import { SignUpRouter } from "./sign-up";

const router = Router();

router.use("/currentUser", CurrentUserRouter);
router.use("/signin", SignInRouter);
router.use("/signout", SignOutRouter);
router.use("/signup", SignUpRouter);

export default router;
