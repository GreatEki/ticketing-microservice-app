import { Request, Response, NextFunction } from "express";
import { ApplicationError } from "../errors";

export async function errorHandler(
  err: ApplicationError,
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (err.name === "ValidationError") err.statusCode = 400;
  res.status(err?.statusCode || 500).send({
    success: false,
    status: err?.status || "Server error",
    statusCode: err?.statusCode || 500,
    message: err.message,
  });
}
