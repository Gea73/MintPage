import { uuidv7 } from "uuidv7"


/*
interface LabelProps {
    id: string
    boardId: string
    name: string
    colorHex: string
    version: number
}*/

export class Label {

    constructor(  id: string | null,
    boardId: string,
    name: string,
    colorHex: string,
    version: number) {
        this.validateFields()
    }

    private validateFields() {
        const id = String(this.id ?? uuidv7()).trim()
        const boardId = String(this.boardId).trim()
        const name = String(this.name).trim()
        const colorHex = String(this.colorHex).trim()
        const version = Number(this.version)

        const colorHexRegex: RegExp = /^#[0-9A-Fa-f]{6}$/i;

        if (typeof id !== "string" || !id) {
            throw new Error("Id is invalid")
        }
        if (typeof boardId !== "string" || !boardId) {
            throw new Error("BoardId is invalid")
        }
        if (typeof name !== "string" || !name) {
            throw new Error("Name is invalid")
        }
        if (name.length > 40) {
            throw new Error("Name is too long (40 characters)")
        }
        if (name.length < 2) {
            throw new Error("Name is too short (2 characters)")
        }
        if (typeof colorHex !== "string" || !colorHex) {
            throw new Error("Colorhex is invalid")
        }

        if (!colorHexRegex.test(colorHex)) {
            throw new Error("Colorhex is not a valid hex")
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
    get colorHex(): string {
        return this.colorHex
    }

    get version(): number {
        return this.version
    }

    public renameLabel() {

    }
    public changeColor() {

    }


}