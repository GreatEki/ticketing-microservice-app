import {
  Listener,
  ExpirationCompleteEvent,
  Subjects,
  OrderStatus,
} from "@greateki-ticket-ms-demo/common";
import { Message } from "node-nats-streaming";
import { QueueGroupName } from "./queue-group-name";
import { Order } from "../../models";
import OrderCancelledPublisher from "../publishers/OrderCancelledPublisher";
import { natsWrapper } from "../nats-wrapper";

export class ExpirationCompleteListener extends Listener<ExpirationCompleteEvent> {
  subject: Subjects.ExpirationComplete = Subjects.ExpirationComplete;
  QueueGroupName: string = QueueGroupName;

  async onMessage(
    data: ExpirationCompleteEvent["data"],
    msg: Message
  ): Promise<void> {
    const order = await Order.findById(data.orderId).populate("ticket");

    if (!order) throw new Error("Order not found");

    const result = await order.updateOne({ status: OrderStatus.Cancelled });

    await new OrderCancelledPublisher(natsWrapper.client).publish({
      id: result.id,
      version: result.version,
      userId: result.userId,
      ticket: {
        id: result.ticket.id,
        price: result.ticket.price,
      },
      expiresAt: result.expiresAt,
      status: result.status,
    });

    msg.ack();
  }
}
