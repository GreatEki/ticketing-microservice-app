import express, { Request, Response, NextFunction } from "express";
import router from "./routes";
import { errorHandler } from "./middlewares/error-handler";
import { NotFoundError } from "./errors";
import connectDB from "./config/database";
import cookieSession from "cookie-session";

const app = express();
app.set("trust proxy", true);

app.use(express.json());
app.use(
  cookieSession({
    signed: false,
    secure: true,
  })
);

app.use("/api/users", router);

app.all("*", async (req: Request, res: Response, next: NextFunction) => {
  next(new NotFoundError("Resource not found"));
});

app.use(errorHandler);

const PORT = process.env.PORT || 3000;

const startApplication = async () => {
  if (!process.env.JWT_KEY) {
    throw new Error("JWT_KEY should be defined");
  }
  await connectDB();
  app.listen(PORT, () =>
    console.log(`Auth microservice listening on PORT ${PORT}!!!`)
  );
};

startApplication();
