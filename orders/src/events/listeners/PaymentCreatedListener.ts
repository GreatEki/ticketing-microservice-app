import {
  Listener,
  PaymentCreatedEvent,
  Subjects,
  OrderStatus,
} from "@greateki-ticket-ms-demo/common";
import { QueueGroupName } from "./queue-group-name";
import { Message } from "node-nats-streaming";

import { Order } from "../../models";

export class PaymentCreatedListener extends Listener<PaymentCreatedEvent> {
  subject: Subjects.PaymentCreated = Subjects.PaymentCreated;
  QueueGroupName: string = QueueGroupName;

  async onMessage(
    data: PaymentCreatedEvent["data"],
    msg: Message
  ): Promise<void> {
    const order = await Order.findById(data.orderId);

    if (!order) throw new Error("Order not found");

    await order?.updateOne({ status: OrderStatus.Complete });

    msg.ack();
  }
}
