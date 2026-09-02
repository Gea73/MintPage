import { TokenStatus } from "../types/enums.js";

interface SessionTokenProps {
    id: string
    userId: string
    hash: string
    status: TokenStatus
}

export class SessionToken {

    constructor(private props: SessionTokenProps) {
        this.validateFields()
    }

    private validateFields() {
        const id = String(this.props.id).trim()
        const userId = String(this.props.userId).trim()
        const hash = String(this.props.hash).trim()
        const status = String(this.props.status).trim()
        if (typeof id !== "string" || !id) {
            throw new Error("Id is invalid")
        }
        if (typeof userId !== "string" || !userId) {
            throw new Error("UserId is invalid")
        }

        if (typeof hash !== "string" || !hash) {
            throw new Error("Hash is invalid")
        }
        if (typeof status !== "string" || !status) {
            throw new Error("Status is invalid")
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
    public refreshToken() {
    }

}