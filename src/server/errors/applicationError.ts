export interface ValidationErrorDetail {
    field: string;
    message: string;
}

export abstract class ApplicationError extends Error {
    abstract readonly title: string
    abstract readonly status: number
    readonly errors?: ValidationErrorDetail[]

    constructor(message: string, errors?: ValidationErrorDetail[]) {
        super(message)
        this.name = this.constructor.name
        this.errors = errors
        Error.captureStackTrace(this, this.constructor)
    }
}