
/*
interface ListProps {
    id: string
    boardId: string
    name: string
    position: string
    version: number
}*/

import { uuidv7 } from "uuidv7"

export class List {

    constructor(id: string | null,
        boardId: string,
        name: string,
        position: string,
        version: number) {
        this.validateFields()
    }

    private validateFields() {
        const id = String(this.id ?? uuidv7()).trim()
        const boardId = String(this.boardId).trim()
        const name = String(this.name).trim()
        const position = String(this.position).trim()
        const version = Number(this.version)
        if (typeof id !== "string" || !id) {
            throw new Error("Id is invalid")
        }
        if (typeof boardId !== "string" || !boardId) {
            throw new Error("OwnerId is invalid")
        }
        if (typeof name !== "string" || !name) {
            throw new Error("Name is invalid")
        }
        if (name.length > 40) {
            throw new Error("Name is too long (40 characters)")
        }
        if (name.length < 4) {
            throw new Error("Name is too short (4 characters)")
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

    get boardId(): string {
        return this.boardId
    }

    get name(): string {
        return this.name
    }
    get position(): string {
        return this.position
    }

    get version(): number {
        return this.version
    }

    public renameList() {

    }
    public createCard() {

    }
    public deleteCard() {

    }
    public moveCard() {

    }

}