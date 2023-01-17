import { Request, Response, NextFunction } from "express";
import * as SignInService from "./sign-in.service";
import jwt from "jsonwebtoken";

export const signInController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, password } = req.body;
    const user = await SignInService.signIn(email, password);

    const userJwt = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_KEY!
    );

    // Store jwt on session object
    req.session = {
      jwt: userJwt,
    };

    return res.status(200).send(user);
  } catch (err) {
    next(err);
  }
};
