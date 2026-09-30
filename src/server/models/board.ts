import { uuidv7 } from "uuidv7"

/*
interface BoardProps {
    id: string
    ownerId: string
    name: string
    version: number
}*/

export class Board {

    constructor(id: string | null,
        ownerId: string,
        name: string,
        version: number) {
        this.validateFields()
    }

    private validateFields() {
        const id = String(this.id ?? uuidv7()).trim()
        const ownerId = String(this.ownerId).trim()
        const name = String(this.name).trim()
        const version = Number(this.version)
        if (typeof id !== "string" || !id) {
            throw new Error("Id is invalid")
        }
        if (typeof ownerId !== "string" || !ownerId) {
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
        if (typeof version !== "number" || isNaN(version) || version < 0) {
            throw new Error("Version is invalid")
        }
    }


    get id(): string {
        return this.id
    }

    get ownerId(): string {
        return this.ownerId
    }

    get name(): string {
        return this.name
    }

    get version(): number {
        return this.version
    }

    public addMember() {

    }
    public removeMember() {

    }
    public changeMemberRole() {
    }

    public renameBoard() {

    }

    public deleteBoard() {

    }

    public createList() {

    }
    public deleteList() {

    }
    public moveList() {

    }
    public createLabel() {

    }
    public moveLabel() {

    }
}