import { uuidv7 } from "uuidv7"

/*

interface CardLabelProps {
    id: string
    cardId: string
    labelId: string
    version: number
}*/

export class CardLabel {

    constructor(id: string | null,
        cardId: string,
        labelId: string,
        version: number) {
        this.validateFields()
    }

    private validateFields() {
        const id = String(this.id ?? uuidv7()).trim()
        const cardId = String(this.cardId).trim()
        const labelId = String(this.labelId).trim()
        const version = Number(this.version)

        if (typeof id !== "string" || !id) {
            throw new Error("Id is invalid")
        }
        if (typeof cardId !== "string" || !cardId) {
            throw new Error("CardId is invalid")
        }
        if (typeof labelId !== "string" || !labelId) {
            throw new Error("LabelId is invalid")
        }

        if (typeof version !== "number" || isNaN(version) || version < 0) {
            throw new Error("Version is invalid")
        }
    }


    get id(): string {
        return this.id
    }

    get cardId(): string {
        return this.cardId
    }

    get labelId(): string {
        return this.labelId
    }

    get version(): number {
        return this.version
    }

}