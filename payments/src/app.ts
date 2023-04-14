import express, { Request, Response, NextFunction } from "express";
import cookieSession from "cookie-session";
import {
  currentUserMiddleWare,
  errorHandler,
  NotFoundError,
} from "@greateki-ticket-ms-demo/common";
// import { AppRouter } from "./router";

const app = express();

app.set("trust proxy", true);
app.use(express.json());

app.use(
  cookieSession({ signed: false, secure: process.env.NODE_ENV !== "test" })
);

app.use(currentUserMiddleWare);

// app.use("/api/tickets", AppRouter);

app.all("*", async (req: Request, res: Response, next: NextFunction) => {
  next(new NotFoundError("Resource not found"));
});

app.use(errorHandler);

export { app };
