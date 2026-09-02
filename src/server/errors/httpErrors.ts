import { ApplicationError, ValidationErrorDetail } from "./applicationError.js";

export class BadRequestError extends ApplicationError {
    public readonly status = 400;
    public readonly title = "Bad Request"
}

export class UnauthorizedError extends ApplicationError {
    public readonly status = 401;
    public readonly title = "Unauthorized"
    constructor(detail = "Authentication is required to access this resource.") {
        super(detail)
    }
}

export class ForbiddenError extends ApplicationError {
    public readonly status = 403
    public readonly title = "Forbidden"
    constructor(detail = "You do not have permission to perform this action.") {
        super(detail)
    }
}

export class ConflictError extends ApplicationError {
    public readonly status = 409;
    public readonly title = "Conflict"
}

export class ValidationError extends ApplicationError {
    public readonly status = 422
    public readonly title = "Validation Failed"
    constructor(detail = "One or more fields failed validation checks.", errors?: ValidationErrorDetail[]) {
        super(detail, errors)
    }

}

export class TooManyRequestError extends ApplicationError {
    public readonly status = 429
    public readonly title = "Too Many Requests"
    constructor(detail = "Too many requests. Please try again later.") {
        super(detail);
    }
}