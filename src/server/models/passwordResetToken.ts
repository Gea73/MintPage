import { TokenStatus } from "../types/enums.js";

interface PasswordResetTokenProps {
    id: string
    userId: string
    hash: string
    status: TokenStatus
}

export class PasswordResetToken {

    constructor(private props: PasswordResetTokenProps) {
        this.validateFields()
    }

    private validateFields() {
        const id = String(this.props.id).trim()
        const userId = String(this.props.userId).trim()
        const hash = String(this.props.hash).trim()
        const status = String(this.props.status).trim()
        if (!id) {
            throw new Error("Id is null")
        }
        if (!userId) {
            throw new Error("UserId is empty")
        }

        if (!hash) {
            throw new Error("Hash is empty")
        }
        if (!status) {
            throw new Error("Status is empty")
        }


    }


    get id(): string {
        return this.props.id
    }

    get userId(): string {
        return this.props.userId
    }

    get hash(): string {
        return this.props.hash
    }
    get status(): TokenStatus {
        return this.props.status
    }

    public isValid() {

    }
    public revokeToken() {

    }

}