import Joi from "@hapi/joi";
import { Request, Response, NextFunction } from "express";

const SignInValSchema = Joi.object({
  email: Joi.string().required(),
  password: Joi.string().required(),
});

export async function signInValidator(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    await SignInValSchema.validateAsync(req.body, {
      allowUnknown: true,
    });
  } catch (err) {
    if (err instanceof Error) {
      next(err);
    }
  }

  next();
}
