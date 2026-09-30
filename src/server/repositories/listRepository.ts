import { Pool } from "pg"
import { List } from "../models/list.js"

export class ListRepository {
    pool: Pool
    constructor(pool: Pool) {
        this.pool = pool
    }


    async create(list: List) {
        const client = await this.pool.connect()

        try {
            client.query("BEGIN")

            client.query("INSERT INTO lists (id,board_id,name,position) VALUES ($1,$2,$3,$4)", [list.id, list.boardId, list.name, list.position])

            client.query("COMMIT")
        } catch (error) {
            client.query("ROLLBACK")
            throw error
        }
        finally {
            client.release()
        }
    }

    async getOneById(id: string): Promise<List> {
        const query = await this.pool.query(
            "SELECT id,board_id,name,position,version FROM lists WHERE id = $1",
            [id],
        );
        const result = query.rows[0];

        return new List(result.id, result.board_id, result.name, result.position, result.version)
    }

    async getAllByBoardId(boardId: string): Promise<List[]> {
        const query = await this.pool.query(
            "SELECT id,board_id,name,position,version FROM lists WHERE board_id = $1",
            [boardId],
        );
        const result = query.rows;

        return result.map((list) => { return new List(list.id, list.board_id, list.name, list.position, list.version) })
    }

    async deleteOneById(id: string) {
        const client = await this.pool.connect()
        try {
            await client.query("BEGIN");

            await client.query("DELETE FROM lists WHERE id = $1", [id])

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

            await client.query("UPDATE lists SET name = $1 WHERE id = $2", [name, id])

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

            await client.query("UPDATE lists SET position = $1 WHERE id = $2", [position, id])

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