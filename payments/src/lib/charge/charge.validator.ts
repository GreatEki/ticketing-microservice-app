import { Request, Response, NextFunction } from "express";
import Joi from "@hapi/joi";

const ChargeValSchema = Joi.object({
  token: Joi.string().required(),
  orderId: Joi.string().required(),
});

export const chargeValidator = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    await ChargeValSchema.validateAsync(req.body, { allowUnknown: true });
  } catch (err) {
    next(err);
  }

  next();
};
