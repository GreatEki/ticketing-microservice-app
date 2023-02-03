import Joi from "@hapi/joi";
import { Request, Response, NextFunction } from "express";

const SignUpValSchema = Joi.object({
  email: Joi.string().email({ minDomainSegments: 2 }).required(),
  password: Joi.string().required(),
});

export async function signUpValidator(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    await SignUpValSchema.validateAsync(req.body, {
      allowUnknown: true,
    });
  } catch (err) {
    if (err instanceof Error) {
      next(err);
      // return res.status(400).send({
      //   message: err.message,
      // });
    }
  }

  next();
}
