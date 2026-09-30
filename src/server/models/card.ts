import { uuidv7 } from "uuidv7"
import { CardStatus } from "../types/enums.js"

/*
interface CardProps {
    id: string
    listId: string
    title: string
    description: string
    status: CardStatus
    position: string
    version: number
}*/

export class Card {

    constructor(id: string | null,
        listId: string,
        title: string,
        description: string,
        status: CardStatus,
        position: string,
        version: number) {
        this.validateFields()
    }

    private validateFields() {
        const id = String(this.id ?? uuidv7()).trim()
        const listId = String(this.listId).trim()
        const title = String(this.title).trim()
        const description = String(this.description).trim()
        const status = String(this.status).trim()
        const position = String(this.position).trim()
        const version = Number(this.version)
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
        return this.id
    }

    get listId(): string {
        return this.listId
    }

    get title(): string {
        return this.title
    }
    get description(): string {
        return this.description
    }
    get status(): CardStatus {
        return this.status
    }
    get position(): string {
        return this.position
    }

    get version(): number {
        return this.version
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