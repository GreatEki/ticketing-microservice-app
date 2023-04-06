import {
  Publisher,
  OrderCancelledEvent,
  Subjects,
} from "@greateki-ticket-ms-demo/common";

export default class OrderCancelledPublisher extends Publisher<OrderCancelledEvent> {
  subject: Subjects.OrderCancelled = Subjects.OrderCancelled;
}
