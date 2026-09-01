import { MemberRole } from "../types/enums.js"


interface BoardMemberProps {
    id: string
    boardId: string
    userId: string
    role: MemberRole
}

export class BoardMember {

    constructor(private props: BoardMemberProps) {
        this.validateFields()
    }

    private validateFields() {
        const id = String(this.props.id).trim()
        const boardId = String(this.props.boardId).trim()
        const userId = String(this.props.userId).trim()
        const role = String(this.props.role).trim()
        if (!id) {
            throw new Error("Id is null")
        }
        if (!boardId) {
            throw new Error("BoardId is invalid")
        }
        if (!userId) {
            throw new Error("UserId is invalid")
        }
        if (!role) {
            throw new Error("Role is invalid")
        }
    }


    get id(): string {
        return this.props.id
    }

    get boardId(): string {
        return this.props.boardId
    }

    get userId(): string {
        return this.props.userId
    }

    get role(): MemberRole {
        return this.props.role
    }

    public canEdit() {

    }
    public canManageMembers() {

    }
}