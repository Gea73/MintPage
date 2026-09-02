-- migrate:up
CREATE TABLE session_tokens(
    id UUID NOT NULL,
    "hash" VARCHAR(255) NOT NULL,
    user_id UUID NOT NULL,
    "status" token_status NOT NULL,
    created_at TIMESTAMP(0) WITHOUT TIME ZONE NOT NULL DEFAULT NOW(),
    expires_at TIMESTAMP(0) WITHOUT TIME ZONE NOT NULL DEFAULT NOW() + INTERVAL '7 days', 
    used_at TIMESTAMP(0) WITHOUT TIME ZONE NOT NULL);
ALTER TABLE
    session_tokens ADD PRIMARY KEY(id);
ALTER TABLE
    session_tokens ADD CONSTRAINT session_tokens_user_id_foreign FOREIGN KEY(user_id) REFERENCES users(id) ON DELETE CASCADE;

CREATE TABLE password_reset_tokens(
    id UUID NOT NULL,
    "hash" VARCHAR(255) NOT NULL,
    user_id UUID NOT NULL,
    "status" token_status NOT NULL,
    created_at TIMESTAMP(0) WITHOUT TIME ZONE NOT NULL DEFAULT NOW(),
    expires_at TIMESTAMP(0) WITHOUT TIME ZONE NOT NULL DEFAULT NOW() + INTERVAL '1 hour',
    used_at TIMESTAMP(0) WITHOUT TIME ZONE);
ALTER TABLE
    password_reset_tokens ADD PRIMARY KEY(id);
ALTER TABLE
    password_reset_tokens ADD CONSTRAINT password_reset_tokens_user_id_foreign FOREIGN KEY(user_id) REFERENCES users(id) ON DELETE CASCADE;

-- migrate:down
DROP TABLE IF EXISTS session_tokens CASCADE;
DROP TABLE IF EXISTS password_reset_tokens CASCADE;

