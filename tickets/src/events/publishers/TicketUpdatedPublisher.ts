import {
  Publisher,
  Subjects,
  TicketUpdatedEvent,
} from "@greateki-ticket-ms-demo/common";

export default class TicketUpdatedPublisher extends Publisher<TicketUpdatedEvent> {
  subject: Subjects.TicketUpdated = Subjects.TicketUpdated;
}
