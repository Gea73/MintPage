-- migrate:up
CREATE TABLE cards(
    id UUID NOT NULL,
    list_id UUID NOT NULL,
    title VARCHAR(255) NOT NULL,
    "description" TEXT NULL,
    position TEXT NOT NULL COLLATE "C",
    "status" card_status NOT NULL DEFAULT 'pending',
    "version" BIGINT NOT NULL DEFAULT 0,
    created_at TIMESTAMP(0) WITHOUT TIME ZONE NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP(0) WITHOUT TIME ZONE NOT NULL DEFAULT NOW());
ALTER TABLE
    cards ADD PRIMARY KEY(id);
ALTER TABLE
    cards ADD CONSTRAINT cards_list_id_foreign FOREIGN KEY(list_id) REFERENCES lists(id) ON DELETE CASCADE;
ALTER TABLE
    cards ADD CONSTRAINT list_cards_position_unique UNIQUE (list_id, position);

-- migrate:down
DROP TABLE IF EXISTS cards CASCADE
