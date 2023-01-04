import { Request, Response } from "express";

export const signInController = async (req: Request, res: Response) => {
  res.send("Sign In");
};
