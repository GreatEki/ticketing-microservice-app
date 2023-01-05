import ApplicationError from "./ApplicationError";

export default class UnauthorizedError extends ApplicationError {
  constructor(message: string = "Authorization failure") {
    super(message, "Unauthorized", 401);
  }
}
