import { Request, Response } from "express";
import jwt from "jsonwebtoken";

export const currentUserController = async (req: Request, res: Response) => {
  res.send("Hi there");
  if (!req.session?.jwt) {
    return res.send({ currentUser: null });
  }

  try {
    const payload = jwt.verify(req.session.jwt, process.env.JWT_KEY!);

    res.send({ currentUser: payload });
  } catch (err) {
    res.send({ currentUser: null });
  }
};
