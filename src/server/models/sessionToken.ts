import { uuidv7 } from "uuidv7";
import { TokenStatus } from "../types/enums.js";


export class SessionToken {

    constructor(id: string | null,
        userId: string,
        hash: string,
        status: TokenStatus) {
        this.validateFields()
    }

    private validateFields() {
        const id = String(this.id ?? uuidv7()).trim()
        const userId = String(this.userId).trim()
        const hash = String(this.hash).trim()
        const status = String(this.status).trim()
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
        return this.id
    }

    get userId(): string {
        return this.userId
    }

    get hash(): string {
        return this.hash
    }
    get status(): TokenStatus {
        return this.status
    }

    public isValid() {

    }
    public revokeToken() {

    }
    public refreshToken() {
    }

}