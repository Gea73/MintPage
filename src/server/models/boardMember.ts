import { uuidv7 } from "uuidv7"
import { MemberRole } from "../types/enums.js"

/*
interface BoardMemberProps {
    id: string
    boardId: string
    userId: string
    role: MemberRole
}*/

export class BoardMember {

    constructor(id: string | null,
    boardId: string,
    userId: string,
    role: MemberRole) {
        this.validateFields()
    }

    private validateFields() {
        const id = String(this.id ?? uuidv7()).trim()
        const boardId = String(this.boardId).trim()
        const userId = String(this.userId).trim()
        const role = String(this.role).trim()
        if (typeof id !== "string" || !id) {
            throw new Error("Id is invalid")
        }
        if (typeof boardId !== "string" || !boardId) {
            throw new Error("BoardId is invalid")
        }
        if (typeof userId !== "string" || !userId) {
            throw new Error("UserId is invalid")
        }
        if (typeof role !== "string" || !role) {
            throw new Error("Role is invalid")
        }
    }


    get id(): string {
        return this.id
    }

    get boardId(): string {
        return this.boardId
    }

    get userId(): string {
        return this.userId
    }

    get role(): MemberRole {
        return this.role
    }

    public canEdit() {

    }
    public canManageMembers() {

    }
}