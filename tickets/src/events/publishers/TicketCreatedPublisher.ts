import {
  Publisher,
  Subjects,
  TicketCreatedEvent,
} from "@greateki-ticket-ms-demo/common";

export default class TicketCreatedPublisher extends Publisher<TicketCreatedEvent> {
  subject: Subjects.TicketCreated = Subjects.TicketCreated;
}
