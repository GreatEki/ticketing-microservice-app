import {
  Publisher,
  ExpirationCompleteEvent,
  Subjects,
} from "@greateki-ticket-ms-demo/common";

export class ExpirationCompletePublisher extends Publisher<ExpirationCompleteEvent> {
  subject: Subjects.ExpirationComplete = Subjects.ExpirationComplete;
}
