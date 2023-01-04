import { Request, Response } from "express";

export const signOutController = async (req: Request, res: Response) => {
  res.send("Sign Out");
};
