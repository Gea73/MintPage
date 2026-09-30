import { Pool } from "pg"
import { Label } from "../models/label.js"

export class LabelRepository {
    pool: Pool
    constructor(pool: Pool) {
        this.pool = pool
    }

    async create(label: Label) {
        const client = await this.pool.connect()

        try {
            client.query("BEGIN")

            client.query("INSERT INTO labels (id,board_id,name,color_hex) VALUES ($1,$2,$3,$4)", [label.id, label.boardId, label.name, label.colorHex])

            client.query("COMMIT")
        } catch (error) {
            client.query("ROLLBACK")
            throw error
        }
        finally {
            client.release()
        }
    }

    async getOneById(id: string): Promise<Label> {
        const query = await this.pool.query(
            "SELECT id,board_id,name,color_hex,version FROM labels WHERE id = $1",
            [id],
        );
        const result = query.rows[0];

        return new Label(result.id, result.board_id, result.name, result.color_hex, result.version)
    }

    async getAllByBoardId(boardId: string): Promise<Label[]> {
        const query = await this.pool.query(
            "SELECT id,board_id,name,color_hex,version FROM labels WHERE board_id = $1",
            [boardId],
        );
        const result = query.rows;

        return result.map((label) => { return new Label(label.id, label.board_id, label.name, label.color_hex, label.version) })
    }

    async deleteOneById(id: string) {
        const client = await this.pool.connect()
        try {
            await client.query("BEGIN");

            await client.query("DELETE FROM labels WHERE id = $1", [id])

            await client.query("COMMIT")
        } catch (error) {
            await client.query("ROLLBACK")
            throw error
        }
        finally {
            client.release()
        }
    }

    async updateNameById(id: string, name: string) {
        const client = await this.pool.connect()
        try {
            await client.query("BEGIN");

            await client.query("UPDATE labels SET name = $1 WHERE id = $2", [name, id])

            await client.query("COMMIT")
        } catch (error) {
            await client.query("ROLLBACK")
            throw error
        }
        finally {
            client.release()
        }
    }

    async updateColorHexById(id: string, colorHex: string) {
        const client = await this.pool.connect()
        try {
            await client.query("BEGIN");

            await client.query("UPDATE labels SET color_hex = $1 WHERE id = $2", [colorHex, id])

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