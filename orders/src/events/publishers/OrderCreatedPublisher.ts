import {
  Publisher,
  OrderCreatedEvent,
  Subjects,
} from "@greateki-ticket-ms-demo/common";

export default class OrderCreatedPublisher extends Publisher<OrderCreatedEvent> {
  subject: Subjects.OrderCreated = Subjects.OrderCreated;
}
