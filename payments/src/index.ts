import { app } from "./app";
import { natsWrapper } from "./events/nats-wrapper";
import connectDB from "./config/database";
import {
  OrderCreatedListener,
  OrderCancelledListener,
} from "./events/listeners";

const PORT = process.env.PORT || 3000;

const startApplication = async () => {
  if (!process.env.JWT_KEY) {
    throw new Error("JWT_KEY should be defined");
  }
  if (!process.env.MONGO_URI) {
    throw new Error("MONGO_URI should be defined");
  }

  if (!process.env.NATS_CLUSTER_ID)
    throw new Error("NATS CLUSTER ID env variable must be defined ");

  if (!process.env.NATS_CLIENT_ID)
    throw new Error("NATS CLIENT ID env variable must be defined ");

  if (!process.env.NATS_URL)
    throw new Error("NATS URL env variable must be defined ");

  await natsWrapper.connect(
    process.env.NATS_CLUSTER_ID,
    process.env.NATS_CLIENT_ID,
    process.env.NATS_URL
  );

  natsWrapper.client.on("close", () => {
    console.log("NATS connection closed in ticket ms");
    process.exit();
  });

  process.on("SIGINT", () => natsWrapper.client.close()); //signal interrupted
  process.on("SIGTERM", () => natsWrapper.client.close()); //signal terminated

  new OrderCreatedListener(natsWrapper.client).listen();
  new OrderCancelledListener(natsWrapper.client).listen();

  await connectDB();

  app.listen(PORT, () =>
    console.log(`Ticket microservice listening on PORT ${PORT}`)
  );
};

startApplication();
