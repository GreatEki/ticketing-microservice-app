import { app } from "./app";
import connectDB from "./config/database";

const PORT = process.env.PORT || 3002;

const startApplication = async () => {
  if (!process.env.JWT_KEY) {
    throw new Error("JWT_KEY should be defined");
  }

  await connectDB();

  app.listen(PORT, () =>
    console.log(`Ticket microservice listening on PORT ${PORT}`)
  );
};

startApplication();
