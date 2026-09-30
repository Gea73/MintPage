import { uuidv7 } from "uuidv7";
import { UserStatus } from "../types/enums.js";

/*
interface UserProps {
    id: string
    username: string
    email: string
    status: UserStatus
}
*/
export class User {

    constructor(id: string | null, username: string, email: string, passwordHash: string, status: UserStatus) {
        this.validateFields()
    }

    private validateFields() {
        const id = String(this.id ?? uuidv7()).trim()
        const username = String(this.username).trim()
        const email = String(this.email).toLowerCase().trim()
        const passwordHash = String(this.passwordHash).trim()
        const status = String(this.status).trim()
        if (typeof id !== "string" || !id) {
            throw new Error("Id is invalid")
        }
        if (typeof username !== "string" || !username) {
            throw new Error("Username is invalid")
        }
        if (username.length > 40) {
            throw new Error("Username is too long (40 characters)")
        }
        if (username.length < 4) {
            throw new Error("Username is too short (4 characters)")
        }
        if (typeof email !== "string" || !email) {
            throw new Error("Email is invalid")
        }
        if (email.length > 50) {
            throw new Error("Email is too long (50 characters)")
        }
        if (email.length < 6) {
            throw new Error("Email is too short (6 characters)")
        }
        if (!email.includes("@")) {
            throw new Error("Email doesn't contain @")
        }
        if (typeof passwordHash !== "string" || !passwordHash) {
            throw new Error("PasswordHash is invalid")
        }
        if (typeof status !== "string" || !status) {
            throw new Error("Status is invalid")
        }
    }


    get id(): string {
        return this.id
    }

    get username(): string {
        return this.username
    }

    get email(): string {
        return this.email
    }

    get passwordHash(): string {
        return this.passwordHash
    }

    get status(): UserStatus {
        return this.status
    }


    public verifyUser() {

    }
    public changeUsername() {

    }
    public changePassword() {
    }
    public suspendUser() {

    }

    public deleteUser() {

    }
}