

interface ListProps {
    id: string
    boardId: string
    name: string
    position: string
    version: number
}

export class List {

    constructor(private props: ListProps) {
        this.validateFields()
    }

    private validateFields() {
        const id = String(this.props.id).trim()
        const boardId = String(this.props.boardId).trim()
        const name = String(this.props.name).trim()
        const position = String(this.props.name).trim()
        const version = Number(this.props.version)
        if (!id) {
            throw new Error("Id is null")
        }
        if (!boardId) {
            throw new Error("OwnerId is empty")
        }
        if (name.length > 40) {
            throw new Error("Name is too long (40 characters)")
        }
        if (name.length < 4) {
            throw new Error("Name is too short (4 characters)")
        }
        if (!position) {
            throw new Error("Position is empty")
        }
        if (!version || version < 0) {
            throw new Error("Version has invalid value")
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
    get position(): string {
        return this.props.position
    }

    get version(): number {
        return this.props.version
    }

    public renameList() {

    }
    public createCard(){

    }
    public deleteCard(){

    }
    public moveCard(){
        
    }
   
}