-- migrate:up
CREATE TYPE user_status AS ENUM ('unverified', 'verified', 'suspended');
CREATE TYPE member_role AS ENUM ('owner', 'admin', 'editor', 'reader');
CREATE TYPE card_status AS ENUM ('pending', 'done');
CREATE TYPE token_status AS ENUM ('valid', 'expired', 'revoked');

-- migrate:down
DROP TYPE IF EXISTS user_status CASCADE;
DROP TYPE IF EXISTS member_role CASCADE;
DROP TYPE IF EXISTS card_status CASCADE;
DROP TYPE IF EXISTS token_status CASCADE;