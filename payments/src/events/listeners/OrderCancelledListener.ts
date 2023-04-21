import {
  Listener,
  OrderCancelledEvent,
  OrderStatus,
  Subjects,
} from "@greateki-ticket-ms-demo/common";
import { QueueGroupName } from "./queue-group-name";
import { Message } from "node-nats-streaming";
import { Order } from "../../models";

export class OrderCancelledListener extends Listener<OrderCancelledEvent> {
  subject: Subjects.OrderCancelled = Subjects.OrderCancelled;
  QueueGroupName: string = QueueGroupName;

  async onMessage(
    data: OrderCancelledEvent["data"],
    msg: Message
  ): Promise<void> {
    const order = await Order.findByEvent({
      id: data.id,
      version: data.version,
    });

    if (!order) throw new Error("Order not found");

    await order.updateOne({ status: OrderStatus.Cancelled });

    msg.ack();
  }
}
