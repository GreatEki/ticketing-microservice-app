import express, { Request, Response, NextFunction } from "express";
import router from "./routes";
import { errorHandler } from "./middlewares/error-handler";
import { NotFoundError } from "./errors";
import connectDB from "./config/database";

const app = express();

app.use(express.json());

app.use("/api/users", router);

app.all("*", async (req: Request, res: Response, next: NextFunction) => {
  next(new NotFoundError("Resource not found"));
});

app.use(errorHandler);

const PORT = process.env.PORT || 3000;

const startApplication = async () => {
  await connectDB();
  app.listen(PORT, () =>
    console.log(`Auth microservice listening on PORT ${PORT}!!!`)
  );
};

startApplication();
