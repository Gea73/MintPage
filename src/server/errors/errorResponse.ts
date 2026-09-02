import { ValidationErrorDetail } from "./applicationError.js";

export interface ErrorResponse {
    title: string;
    status: number;
    detail: string;
    instance: string;
    errors?: ValidationErrorDetail[];
}