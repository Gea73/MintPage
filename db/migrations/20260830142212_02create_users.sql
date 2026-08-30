-- migrate:up
CREATE TABLE users(
    id UUID NOT NULL,
    username VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    "status" user_status NOT NULL DEFAULT 'unverified',
    created_at TIMESTAMP(0) WITHOUT TIME ZONE NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP(0) WITHOUT TIME ZONE NOT NULL DEFAULT NOW());
ALTER TABLE
    users ADD PRIMARY KEY(id);
ALTER TABLE
    users ADD CONSTRAINT users_username_unique UNIQUE(username);
ALTER TABLE
    users ADD CONSTRAINT users_email_unique UNIQUE(email);

-- migrate:down
DROP TABLE IF EXISTS users CASCADE;
