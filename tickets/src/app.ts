import express, { Request, Response, NextFunction } from "express";
import cookieSession from "cookie-session";
import { errorHandler, NotFoundError } from "@greateki-ticket-ms-demo/common";

const app = express();

app.set("trust proxy", true);
app.use(express.json());

app.use(
  cookieSession({ signed: false, secure: process.env.NODE_ENV !== "test" })
);

app.all("*", async (req: Request, res: Response, next: NextFunction) => {
  next(new NotFoundError("Resource not found"));
});

app.use(errorHandler);

export { app };
