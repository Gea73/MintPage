

interface BoardProps {
    id: string
    ownerId: string
    name: string
    version: number
}

export class Board {

    constructor(private props: BoardProps) {
        this.validateFields()
    }

    private validateFields() {
        const id = String(this.props.id).trim()
        const ownerId = String(this.props.ownerId).trim()
        const name = String(this.props.name).trim()
        const version = Number(this.props.version)
        if (!id) {
            throw new Error("Id is null")
        }
        if (!ownerId) {
            throw new Error("OwnerId is empty")
        }
        if (name.length > 40) {
            throw new Error("Name is too long (40 characters)")
        }
        if (name.length < 4) {
            throw new Error("Name is too short (4 characters)")
        }
        if (!version || version < 0) {
            throw new Error("Version has invalid value")
        }
    }


    get id(): string {
        return this.props.id
    }

    get ownerId(): string {
        return this.props.ownerId
    }

    get name(): string {
        return this.props.name
    }

    get version(): number {
        return this.props.version
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