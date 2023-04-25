import {
  Publisher,
  Subjects,
  PaymentCreatedEvent,
} from "@greateki-ticket-ms-demo/common";

export class PaymentCreatedPublisher extends Publisher<PaymentCreatedEvent> {
  subject: Subjects.PaymentCreated = Subjects.PaymentCreated;
}
