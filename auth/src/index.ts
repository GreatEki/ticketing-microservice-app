import connectDB from "./config/database";
import { app } from "./app";

const PORT = process.env.PORT || 3000;

const startApplication = async () => {
  if (!process.env.JWT_KEY) {
    throw new Error("JWT_KEY should be defined");
  }

  if (!process.env.MONGO_URI) {
    throw new Error("MONGO_URI should be defined for auth service");
  }
  await connectDB();
  app.listen(PORT, () =>
    console.log(`Auth microservice listening on PORT ${PORT}!!!`)
  );
};

startApplication();
