import Queue from "bull";
import { ExpirationCompletePublisher } from "../events/publisher/ExpirationCompletePublisher";
import { natsWrapper } from "../events/nats-wrapper";

interface Payload {
  orderId: string;
}

const expirationQueue = new Queue<Payload>("order:expiration", {
  redis: {
    host: process.env.REDIS_HOST,
  },
});

expirationQueue.process(async (job) => {
  console.log("I want to publish a job for order:exipration", job.data.orderId);

  await new ExpirationCompletePublisher(natsWrapper.client).publish({
    orderId: job.data.orderId,
  });
});

export { expirationQueue };
