import { ErrorRequestHandler, NextFunction, Request, Response } from "express"
import { ApplicationError, ValidationErrorDetail } from "../errors/applicationError.js"
import { ZodError } from "zod"
import { ErrorResponse } from "../errors/errorResponse.js"

export const errorHandler: ErrorRequestHandler = (err: unknown, req: Request, res: Response, next: NextFunction) => {
    const instance = req.originalUrl || req.url

    if (err instanceof ApplicationError) {
        const response: ErrorResponse = {
            title: err.title,
            status: err.status,
            detail: err.message,
            instance, ...(err.errors && err.errors.length > 0 ? { errors: err.errors } : {})
        }

        res.status(err.status).contentType("application/problem+json").json(response)
        return;
    }

    if (err instanceof ZodError) {

        const formattedErrors: ValidationErrorDetail[] = err.issues.map((issue) => ({
            field: issue.path.join(".") || "body",
            message: issue.message
        }))
        const response: ErrorResponse = {
            title: "Validation Failed",
            status: 422,
            detail: "One or more fields failed validation checks.",
            instance,
            errors: formattedErrors

        }

        res.status(422).contentType("application/problem+json").json(response)
        return;
    }

    console.error("Unhandled Error", err)
    const response: ErrorResponse = {
        title: "Internal Server Error",
        status: 500,
        detail: process.env.NODE_ENV === "production" ? "An unexpected error occurred." : err instanceof Error ? err.message : "An unexpected error occurred.",
        instance,

    }
    res.status(500).contentType("application/problem+json").json(response)
}