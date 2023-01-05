import ApplicationError from "./ApplicationError";

export default class ForbiddenError extends ApplicationError {
  constructor(message: string = "Forbidden Error") {
    super(message, "Forbidden", 403);
  }
}
