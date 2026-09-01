import { UserStatus } from "../types/enums.js";

interface UserProps {
    id: string
    username: string
    email: string
    status: UserStatus
}

export class User {

    constructor(private props: UserProps) {
        this.validateFields()
    }

    private validateFields() {
        const id = String(this.props.id).trim()
        const username = String(this.props.username).trim()
        const email = String(this.props.email).toLowerCase().trim()
        const status = this.props.status
        if (!id) {
            throw new Error("Id is null")
        }
        if (!username) {
            throw new Error("Username is empty")
        }
        if (username.length > 40) {
            throw new Error("Username is too long (40 characters)")
        }
        if (username.length < 4) {
            throw new Error("Username is too short (4 characters)")
        }
        if (!email) {
            throw new Error("Email is empty")
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
        if (!status) {
            throw new Error("Status is empty")
        }
    }


    get id(): string {
        return this.props.id
    }

    get username(): string {
        return this.props.username
    }

    get email(): string {
        return this.props.email
    }

    get status(): UserStatus {
        return this.props.status
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