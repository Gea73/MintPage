-- migrate:up
CREATE TABLE lists(
    id UUID NOT NULL,
    board_id UUID NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    position TEXT NOT NULL COLLATE "C",
    "version" BIGINT NOT NULL DEFAULT 0,
    created_at TIMESTAMP(0) WITHOUT TIME ZONE NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP(0) WITHOUT TIME ZONE NOT NULL DEFAULT NOW());
ALTER TABLE
    lists ADD PRIMARY KEY(id);
ALTER TABLE
    lists ADD CONSTRAINT lists_board_id_foreign FOREIGN KEY(board_id) REFERENCES boards(id) ON DELETE CASCADE;

-- migrate:down
DROP TABLE IF EXISTS lists CASCADE
