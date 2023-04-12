import {
  OrderCreatedEvent,
  Listener,
  Subjects,
  NotFoundError,
} from "@greateki-ticket-ms-demo/common";
import { QueueGroupName } from "./queue-group-name";
import { Message } from "node-nats-streaming";
import Ticket from "../../model/Ticket";

export class OrderCreatedListener extends Listener<OrderCreatedEvent> {
  subject: Subjects.OrderCreated = Subjects.OrderCreated;
  QueueGroupName: string = QueueGroupName;

  async onMessage(
    data: OrderCreatedEvent["data"],
    msg: Message
  ): Promise<void> {
    const ticket = await Ticket.findById(data.ticket.id);

    if (!ticket) throw new NotFoundError("Ticket not found");

    await ticket.updateOne({ orderId: data.id });

    msg.ack();
  }
}
