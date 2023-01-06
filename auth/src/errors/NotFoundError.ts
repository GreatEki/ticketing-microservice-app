import ApplicationError from "./ApplicationError";

export default class NotFoundError extends ApplicationError {
  constructor(message: string = "Not found error") {
    super(message, "Not Found", 404);
  }
}
