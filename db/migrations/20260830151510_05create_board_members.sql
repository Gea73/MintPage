-- migrate:up
CREATE TABLE board_members(
    id UUID NOT NULL,
    board_id UUID NOT NULL,
    user_id UUID NOT NULL,
    "role" member_role NOT NULL,
    created_at TIMESTAMP(0) WITHOUT TIME ZONE NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP(0) WITHOUT TIME ZONE NOT NULL DEFAULT NOW());
ALTER TABLE
    board_members ADD PRIMARY KEY(id);
ALTER TABLE
    board_members ADD CONSTRAINT board_members_board_id_foreign FOREIGN KEY(board_id) REFERENCES boards(id) ON DELETE CASCADE;
ALTER TABLE
    board_members ADD CONSTRAINT board_members_user_id_foreign FOREIGN KEY(user_id) REFERENCES users(id) ON DELETE CASCADE;
ALTER TABLE
    board_members ADD CONSTRAINT board_member_unique UNIQUE(board_id,user_id);
-- migrate:down
DROP TABLE IF EXISTS board_members CASCADE
