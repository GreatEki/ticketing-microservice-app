import { natsWrapper } from "./events/nats-wrapper";
import { OrderCreatedListener } from "./events/listeners/OrderCreatedListener";

const PORT = process.env.PORT || 3000;

const startApplication = async () => {
  if (!process.env.NATS_CLUSTER_ID)
    throw new Error("NATS CLUSTER ID env variable must be defined ");

  if (!process.env.NATS_CLIENT_ID)
    throw new Error("NATS CLIENT ID env variable must be defined ");

  if (!process.env.NATS_URL)
    throw new Error("NATS URL env variable must be defined ");

  try {
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
  } catch (err) {
    console.error(err);
  }
};

startApplication();
