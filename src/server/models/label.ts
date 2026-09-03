import { CardStatus } from "../types/enums.js"


interface LabelProps {
    id: string
    boardId: string
    name: string
    colorHex: string
    version: number
}

export class Label {

    constructor(private props: LabelProps) {
        this.validateFields()
    }

    private validateFields() {
        const id = String(this.props.id).trim()
        const boardId = String(this.props.boardId).trim()
        const name = String(this.props.name).trim()
        const colorHex = String(this.props.colorHex).trim()
        const version = Number(this.props.version)

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
        return this.props.id
    }

    get boardId(): string {
        return this.props.boardId
    }

    get name(): string {
        return this.props.name
    }
    get colorHex(): string {
        return this.props.colorHex
    }

    get version(): number {
        return this.props.version
    }

    public renameLabel() {

    }
    public changeColor() {

    }


}