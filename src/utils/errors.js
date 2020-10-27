class GeneralError extends Error {
  constructor(message) {
    super();
    this.message = message;
  }

  getCode() {
    if (this instanceof BadRequest) {
      return 400;
    }
    if (this instanceof Conflict) {
      return 409;
    }
    if (this instanceof NotFound) {
      return 404;
    }
    if (this instanceof NotUpdated) {
      return 404;
    }
    if (this instanceof Unauthorized) {
      return 401;
    }
    return 500;
  }
}

class BadRequest extends GeneralError {}
class Conflict extends GeneralError {}
class NotFound extends GeneralError {}
class NotUpdated extends GeneralError {}
class Unauthorized extends GeneralError {}

export {
  GeneralError,
  Conflict,
  BadRequest,
  NotFound,
  NotUpdated,
  Unauthorized,
};
