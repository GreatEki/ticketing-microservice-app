import { Request, Response } from "express";
import jwt from "jsonwebtoken";

export const currentUserController = async (req: Request, res: Response) => {
  res.send({ currentUser: req.currentUser || null });
};
