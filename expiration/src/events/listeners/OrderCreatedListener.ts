import {
  Listener,
  Subjects,
  OrderCreatedEvent,
} from "@greateki-ticket-ms-demo/common";
import { QueueGroupName } from "./queue-group-name";
import { Message } from "node-nats-streaming";
import { expirationQueue } from "../../queues/expiration-queue";

export class OrderCreatedListener extends Listener<OrderCreatedEvent> {
  subject: Subjects.OrderCreated = Subjects.OrderCreated;
  QueueGroupName: string = QueueGroupName;

  onMessage(data: OrderCreatedEvent["data"], msg: Message): void {
    const delay = new Date(data.expiresAt).getTime() - new Date().getTime();
    console.log(delay);

    expirationQueue.add({ orderId: data.id }, { delay });

    msg.ack();
  }
}
