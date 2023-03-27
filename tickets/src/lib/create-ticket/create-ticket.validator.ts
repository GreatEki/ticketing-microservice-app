import Joi from "@hapi/joi";
import { NextFunction, Request, Response } from "express";

const CreateTicketValSchema = Joi.object({
  title: Joi.string().required(),
  price: Joi.number().required,
});

export const CreateTicketValidator = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    await CreateTicketValSchema.validateAsync(req.body, { allowUnknown: true });
  } catch (err) {
    next(err);
  }

  next();
};
