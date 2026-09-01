-- migrate:up
CREATE TABLE labels(
    id UUID NOT NULL,
    board_id UUID NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    color_hex VARCHAR(7) NOT NULL CHECK (color_hex ~ '^#[0-9A-Fa-f]{6}$'),
    "version" BIGINT NOT NULL DEFAULT 0,
    created_at TIMESTAMP(0) WITHOUT TIME ZONE NOT NULL DEFAULT NOW(),
     updated_at TIMESTAMP(0) WITHOUT TIME ZONE NOT NULL DEFAULT NOW());
ALTER TABLE
    labels ADD PRIMARY KEY(id);
ALTER TABLE
    labels ADD CONSTRAINT labels_board_id_foreign FOREIGN KEY(board_id) REFERENCES boards(id) ON DELETE CASCADE;

-- migrate:down
DROP TABLE IF EXISTS labels CASCADE
