import { Request, Response, NextFunction } from "express";
import { ApplicationError, BadRequestError } from "../../errors";

export const signUpController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    throw new BadRequestError("Database connection failure");
    // res.send("Signing up controller is ready ");
  } catch (err) {
    next(err);
  }
};
