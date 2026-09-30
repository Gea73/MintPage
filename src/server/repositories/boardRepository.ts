import { Pool } from "pg";
import { Board } from "../models/board.js";
import { BoardMember } from "../models/boardMember.js";
import { MemberRole } from "../types/enums.js";

export class BoardRepository {
    pool: Pool
    constructor(pool: Pool) {
        this.pool = pool
    }

    async create(board: Board, boardOwner: BoardMember) {
        const client = await this.pool.connect()

        try {
            client.query("BEGIN")

            client.query("INSERT INTO boards (id,owner_id,name) VALUES ($1,$2,$3)", [board.id, board.ownerId, board.name])
            client.query("INSERT INTO board_members (id,board_id,user_id,role) VALUES ($1,$2,$3,$4)", [boardOwner.id, boardOwner.boardId, boardOwner.userId, boardOwner.role])


            client.query("COMMIT")
        } catch (error) {
            client.query("ROLLBACK")
            throw error
        }
        finally {
            client.release()
        }
    }


    async createBoardMember(boardMember: BoardMember) {
        const client = await this.pool.connect()

        try {
            client.query("BEGIN")

            client.query("INSERT INTO board_members (id,board_id,user_id,role) VALUES ($1,$2,$3,$4)", [boardMember.id, boardMember.boardId, boardMember.userId, boardMember.role])

            client.query("COMMIT")
        } catch (error) {
            client.query("ROLLBACK")
            throw error
        }
        finally {
            client.release()
        }
    }

    async getOneById(id: string): Promise<Board> {
        const query = await this.pool.query(
            "SELECT id,owner_id,name,version FROM boards WHERE id = $1",
            [id],
        );
        const result = query.rows[0];

        return new Board(result.id, result.owner_id, result.name, result.version)
    }

    async getAllOwnedBy(ownerId: string): Promise<Board[]> {
        const query = await this.pool.query("SELECT id,owner_id,name,version FROM boards WHERE owner_id = $1", [ownerId])

        const result = query.rows

        return result.map((board) => {
            return new Board(board.id, board.owner_id, board.name, board.version)
        })

    }

    async getAllWhereIsMember(userId: string): Promise<Board[]> {

        const query = await this.pool.query("SELECT b.id,b.owner_id,b.name,b.version FROM boards AS b JOIN board_members AS bm ON b.id = bm.board_id WHERE bm.user_id = $1", [userId])

        const result = query.rows

        return result.map((board) => {
            return new Board(board.id, board.owner_id, board.name, board.version)
        })
    }

    async getAllMembers(id: string): Promise<BoardMember[]> {
        const query = await this.pool.query("SELECT id,board_id,user_id,role FROM board_members WHERE board_id = $1", [id])
        const result = query.rows

        return result.map((member) => {
            return new BoardMember(member.id, member.board_id, member.user_id, member.role)
        })


    }

    async deleteOneById(id: string) {
        const client = await this.pool.connect()
        try {
            await client.query("BEGIN");

            await client.query("DELETE FROM boards WHERE id = $1", [id])

            await client.query("COMMIT")
        } catch (error) {
            await client.query("ROLLBACK")
            throw error
        }
        finally {
            client.release()
        }
    }

    async deleteOneBoardMember(boardId: string, userId: string) {
        const client = await this.pool.connect()
        try {
            await client.query("BEGIN");

            await client.query("DELETE FROM board_members WHERE board_id = $1 AND user_id = $2", [boardId, userId])

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

            await client.query("UPDATE boards SET name = $1 WHERE id = $2", [name, id])

            await client.query("COMMIT")
        } catch (error) {
            await client.query("ROLLBACK")
            throw error
        }
        finally {
            client.release()
        }
    }

    async updateBoardMemberRole(boardId: string, userId: string, role: MemberRole) {
        const client = await this.pool.connect()
        try {
            await client.query("BEGIN");

            await client.query("UPDATE board_members SET role = $1 WHERE board_id = $2 AND user_id = $3", [role, boardId, userId])

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