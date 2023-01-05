import ApplicationError from "./ApplicationError";

export default class PaymentError extends ApplicationError {
  constructor(message: string = "Payment required") {
    super(message, "Payment required", 402);
  }
}
