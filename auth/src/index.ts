import connectDB from "./config/database";
import { app } from "./app";

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
