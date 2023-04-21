import {
  Listener,
  OrderCreatedEvent,
  Subjects,
} from "@greateki-ticket-ms-demo/common";
import { QueueGroupName } from "./queue-group-name";
import { Message } from "node-nats-streaming";
import { Order } from "../../models";

export class OrderCreatedListener extends Listener<OrderCreatedEvent> {
  subject: Subjects.OrderCreated = Subjects.OrderCreated;
  QueueGroupName: string = QueueGroupName;

  async onMessage(
    data: OrderCreatedEvent["data"],
    msg: Message
  ): Promise<void> {
    const order = Order.buildNewDocument({
      id: data.id,
      price: data.ticket.price,
      status: data.status,
      userId: data.userId,
      version: data.version,
    });

    await order.save();

    msg.ack();
  }
}
