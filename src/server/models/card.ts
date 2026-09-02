import { CardStatus } from "../types/enums.js"


interface CardProps {
    id: string
    listId: string
    title: string
    description: string
    status: CardStatus
    position: string
    version: number
}

export class Card {

    constructor(private props: CardProps) {
        this.validateFields()
    }

    private validateFields() {
        const id = String(this.props.id).trim()
        const listId = String(this.props.listId).trim()
        const title = String(this.props.title).trim()
        const description = String(this.props.description).trim()
        const status = String(this.props.status).trim()
        const position = String(this.props.position).trim()
        const version = Number(this.props.version)
        if (typeof id !== "string" || !id) {
            throw new Error("Id is invalid")
        }
        if (typeof listId !== "string" || !listId) {
            throw new Error("ListId is invalid")
        }
        if (typeof title !== "string" || !title) {
            throw new Error("Title is invalid")
        }

        if (title.length > 40) {
            throw new Error("Title is too long (40 characters)")
        }
        if (title.length < 2) {
            throw new Error("Title is too short (2 characters)")
        }
        if (typeof description !== "string" || !description) {
            throw new Error("Description is invalid")
        }

        if (description.length > 400) {
            throw new Error("Description is too long (400 characters")
        }
        if (typeof status !== "string" || !status) {
            throw new Error("Status is invalid")
        }
        if (typeof position !== "string" || !position) {
            throw new Error("Position is invalid")
        }
        if (typeof version !== "number" || isNaN(version) || version < 0) {
            throw new Error("Version is invalid")
        }
    }


    get id(): string {
        return this.props.id
    }

    get listId(): string {
        return this.props.listId
    }

    get title(): string {
        return this.props.title
    }
    get description(): string {
        return this.props.description
    }
    get status(): CardStatus {
        return this.props.status
    }
    get position(): string {
        return this.props.position
    }

    get version(): number {
        return this.props.version
    }

    public renameCard() {

    }
    public changeStatus() {

    }
    public changeDescription() {

    }
    public addLabel() {

    }
    public removeLabel() {

    }

}