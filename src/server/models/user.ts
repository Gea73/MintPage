export class User {
    #id!: string;
    #username!: string;
    #email!: string;
    #status!: string;

    constructor(id: string, username: string, email: string, status: string) {
        this.id = id;
        this.username = username;
        this.email = email;
        this.status = status;
    }

    set id(id: string) {
        if (!id) {
            throw new Error("Id is null")
        }
        this.#id = id;
    }

    get id(): string {
        return this.#id
    }

    set username(username: string) {
        const value = String(username).trim();


        if (!value) {
            throw new Error("Username is empty")
        }
        if (value.length > 40) {
            throw new Error("Username is too long (40 characters)")
        }
        if (value.length < 4) {
            throw new Error("Username is too short (4 characters)")
        }

        this.#username = value;
    }

    get username(): string {
        return this.#username
    }

    set email(email: string) {

        const value = String(email).trim();

        if (!value) {
            throw new Error("Email is empty")
        }
        if (value.length > 50) {
            throw new Error("Email is too long (50 characters)")
        }
        if (value.length < 6) {
            throw new Error("Email is too short (6 characters)")
        }
        if (!value.includes("@")) {
            throw new Error("Email doesn't contain @")
        }


        this.#email = value;
    }

    get email(): string {
        return this.#email
    }

    set status(status: string) {
        if (!status || !String(status).trim()) {
            throw new Error("Status is empty")
        }
        this.#status = status;
    }

    get status(): string {
        return this.#status
    }
}