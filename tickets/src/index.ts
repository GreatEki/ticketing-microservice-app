import { app } from "./app";
import connectDB from "./config/database";
import { natsWrapper } from "./events/nats-wrapper";
import { randomBytes } from "crypto";

const PORT = process.env.PORT || 3000;

const startApplication = async () => {
  if (!process.env.JWT_KEY) {
    throw new Error("JWT_KEY should be defined");
  }
  if (!process.env.MONGO_URI) {
    throw new Error("MONGO_URI should be defined");
  }

  await natsWrapper.connect(
    "ticketing",
    randomBytes(4).toString("hex"),
    "http://nats-srv:422"
  );

  await connectDB();

  app.listen(PORT, () =>
    console.log(`Ticket microservice listening on PORT ${PORT}`)
  );
};

startApplication();
