import { ApplicationError } from "./applicationError.js"

export class InvalidCredentialsError extends ApplicationError {
    public readonly status = 401
    public readonly title = "Invalid Credentials"
    constructor(detail = "One or more credentials are invalid.") {
        super(detail)
    }

}