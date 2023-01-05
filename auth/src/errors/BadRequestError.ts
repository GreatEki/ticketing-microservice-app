import ApplicationError from "./ApplicationError";

export default class BadRequestError extends ApplicationError {
  constructor(message: string = "Bad request error") {
    super(message, "Bad Request", 400);
  }
}
