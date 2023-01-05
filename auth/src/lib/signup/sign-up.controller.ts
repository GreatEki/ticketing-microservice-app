import { Request, Response } from "express";

export const signUpController = async (req: Request, res: Response) => {
  res.send("Signing up controller is ready ");
};
