import { Request, Response } from "express"
import { ErrorResponse } from "../errors/errorResponse.js"

export const notFoundHandler = (req: Request, res: Response) => {

    const response: ErrorResponse = {
        title: "Not Found",
        status: 404,
        detail: `The resource ${req.method} ${req.originalUrl} does not exist.`,
        instance: req.originalUrl || req.url

    }

    res.status(404).contentType("application/problem+json").json(response)
}