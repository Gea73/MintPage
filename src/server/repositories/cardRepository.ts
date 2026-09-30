import { Pool } from "pg"
import { Card } from "../models/card.js"
import { CardStatus } from "../types/enums.js"
import { CardLabel } from "../models/cardLabel.js"

export class CardRepository {
    pool: Pool
    constructor(pool: Pool) {
        this.pool = pool
    }

    async create(card: Card) {
        const client = await this.pool.connect()

        try {
            client.query("BEGIN")

            client.query("INSERT INTO cards (id,list_id,title,description,position,status) VALUES ($1,$2,$3,$4,$5,$6,$7)", [card.id, card.listId, card.title, card.description, card.position, card.status])

            client.query("COMMIT")
        } catch (error) {
            client.query("ROLLBACK")
            throw error
        }
        finally {
            client.release()
        }
    }

    async createCardLabel(cardLabel: CardLabel) {
        const client = await this.pool.connect()

        try {
            client.query("BEGIN")

            client.query("INSERT INTO card_labels (id,card_id,label_id) VALUES ($1,$2,$3)", [cardLabel.id, cardLabel.cardId, cardLabel.labelId])

            client.query("COMMIT")
        } catch (error) {
            client.query("ROLLBACK")
            throw error
        }
        finally {
            client.release()
        }
    }

    async getOneById(id: string): Promise<Card> {
        const query = await this.pool.query(
            "SELECT id,list_id,title,description,position,status,version FROM cards WHERE id = $1",
            [id],
        );
        const result = query.rows[0];

        return new Card(result.id, result.list_id, result.title, result.description, result.position, result.status, result.version)
    }

    async getAllByListId(listId: string): Promise<Card[]> {
        const query = await this.pool.query(
            "SELECT id,list_id,title,description,position,status,version FROM cards WHERE list_id = $1",
            [listId],
        );
        const result = query.rows;

        return result.map((card) => { return new Card(card.id, card.list_id, card.title, card.description, card.position, card.status, card.version) })
    }

    async getOneCardLabelById(id: string) {
        const query = await this.pool.query(
            "SELECT id,card_id,label_id,version FROM card_labels WHERE id = $1",
            [id],
        );
        const result = query.rows[0];

        return new CardLabel(result.id, result.card_id, result.label_id, result.version)
    }

    async deleteOneById(id: string) {
        const client = await this.pool.connect()
        try {
            await client.query("BEGIN");

            await client.query("DELETE FROM cards WHERE id = $1", [id])

            await client.query("COMMIT")
        } catch (error) {
            await client.query("ROLLBACK")
            throw error
        }
        finally {
            client.release()
        }
    }

    async deleteOneCardLabelById(id: string) {
        const client = await this.pool.connect()
        try {
            await client.query("BEGIN");

            await client.query("DELETE FROM card_labels WHERE id = $1", [id])

            await client.query("COMMIT")
        } catch (error) {
            await client.query("ROLLBACK")
            throw error
        }
        finally {
            client.release()
        }
    }

    async updateListIdById(id: string, listId: string) {
        const client = await this.pool.connect()
        try {
            await client.query("BEGIN");

            await client.query("UPDATE cards SET list_id = $1 WHERE id = $2", [listId, id])

            await client.query("COMMIT")
        } catch (error) {
            await client.query("ROLLBACK")
            throw error
        }
        finally {
            client.release()
        }
    }
    async updateTitleById(id: string, title: string) {
        const client = await this.pool.connect()
        try {
            await client.query("BEGIN");

            await client.query("UPDATE cards SET title = $1 WHERE id = $2", [title, id])

            await client.query("COMMIT")
        } catch (error) {
            await client.query("ROLLBACK")
            throw error
        }
        finally {
            client.release()
        }
    }

    async updateDescriptionById(id: string, description: string) {
        const client = await this.pool.connect()
        try {
            await client.query("BEGIN");

            await client.query("UPDATE cards SET description = $1 WHERE id = $2", [description, id])

            await client.query("COMMIT")
        } catch (error) {
            await client.query("ROLLBACK")
            throw error
        }
        finally {
            client.release()
        }
    }

    async updatePositionById(id: string, position: string) {
        const client = await this.pool.connect()
        try {
            await client.query("BEGIN");

            await client.query("UPDATE cards SET position = $1 WHERE id = $2", [position, id])

            await client.query("COMMIT")
        } catch (error) {
            await client.query("ROLLBACK")
            throw error
        }
        finally {
            client.release()
        }
    }

    async updateStatusById(id: string, status: CardStatus) {
        const client = await this.pool.connect()
        try {
            await client.query("BEGIN");

            await client.query("UPDATE cards SET status = $1 WHERE id = $2", [status, id])

            await client.query("COMMIT")
        } catch (error) {
            await client.query("ROLLBACK")
            throw error
        }
        finally {
            client.release()
        }
    }


}