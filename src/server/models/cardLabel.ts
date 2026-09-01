


interface CardLabelProps {
    id: string
    cardId: string
    labelId: string
    version: number
}

export class CardLabel {

    constructor(private props: CardLabelProps) {
        this.validateFields()
    }

    private validateFields() {
        const id = String(this.props.id).trim()
        const cardId = String(this.props.cardId).trim()
        const labelId = String(this.props.labelId).trim()
        const version = Number(this.props.version)

        if (!id) {
            throw new Error("Id is null")
        }
        if (!cardId) {
            throw new Error("CardId is empty")
        }
        if (!labelId) {
            throw new Error("LabelId is empty")
        }

        if (!version || version < 0) {
            throw new Error("Version has invalid value")
        }
    }


    get id(): string {
        return this.props.id
    }

    get cardId(): string {
        return this.props.cardId
    }

    get labelId(): string {
        return this.props.labelId
    }

    get version(): number {
        return this.props.version
    }

}