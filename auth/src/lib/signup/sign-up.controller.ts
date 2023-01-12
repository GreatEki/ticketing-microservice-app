import { Request, Response, NextFunction } from "express";
import { ApplicationError, BadRequestError } from "../../errors";
import * as AuthService from "./sign-up.service";
import jwt from "jsonwebtoken";

export const signUpController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, password } = req.body;

    const signedUpUser = await AuthService.signup({ email, password });

    // Generate JWT
    const userJwt = jwt.sign(
      { id: signedUpUser._id, email: signedUpUser.email },
      process.env.JWT_KEY!
    );

    // Store jwt on session object
    req.session = {
      jwt: userJwt,
    };

    return res.status(201).send({
      success: true,
      status: "OK",
      statusCode: 201,
      data: signedUpUser,
    });
  } catch (err) {
    next(err);
  }
};
