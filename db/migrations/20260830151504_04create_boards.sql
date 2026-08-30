-- migrate:up
CREATE TABLE boards(
    id UUID NOT NULL,
    owner_id UUID NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "version" BIGINT NOT NULL DEFAULT 0,
    created_at TIMESTAMP(0) WITHOUT TIME ZONE NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP(0) WITHOUT TIME ZONE NOT NULL DEFAULT NOW());
ALTER TABLE
    boards ADD PRIMARY KEY(id);
ALTER TABLE
    boards ADD CONSTRAINT boards_owner_id_foreign FOREIGN KEY(owner_id) REFERENCES users(id);

-- migrate:down
DROP TABLE IF EXISTS boards CASCADE
