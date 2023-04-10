import { Message } from "node-nats-streaming";
import {
  Subjects,
  Listener,
  TicketCreatedEvent,
} from "@greateki-ticket-ms-demo/common";
import { QueueGroupName } from "./queue-group-name";
import { Ticket } from "../../models";

export class TicketCreatedListener extends Listener<TicketCreatedEvent> {
  subject: Subjects.TicketCreated = Subjects.TicketCreated;
  QueueGroupName: string = QueueGroupName;

  async onMessage(
    data: TicketCreatedEvent["data"],
    msg: Message
  ): Promise<void> {
    const { id, title, price } = data;
    const ticket = Ticket.buildNewDocument({
      id,
      title,
      price,
    });
    await ticket.save();

    msg.ack();
  }
}
