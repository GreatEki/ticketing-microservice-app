import express, { Request, Response, NextFunction } from "express";
import router from "./routes";
import { errorHandler } from "./middlewares/error-handler";
import { NotFoundError } from "./errors";

import cookieSession from "cookie-session";

const app = express();
app.set("trust proxy", true);

app.use(express.json());
app.use(
  cookieSession({
    signed: false,
    secure: process.env.NODE_ENV !== "test",
  })
);
// the above secure prop will set secure to true as long as we are not in a test environment.
// dev environment secure = true
// prod environment secure = true
// test environemtn secure = false

app.use("/api/users", router);

app.all("*", async (req: Request, res: Response, next: NextFunction) => {
  next(new NotFoundError("Resource not found"));
});

app.use(errorHandler);

export { app };
