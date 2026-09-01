-- migrate:up

CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER users_update_updated_at
BEFORE UPDATE ON users
FOR EACH ROW
EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER boards_update_updated_at
BEFORE UPDATE ON boards
FOR EACH ROW
EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER board_members_update_updated_at
BEFORE UPDATE ON board_members
FOR EACH ROW
EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER lists_update_updated_at
BEFORE UPDATE ON lists
FOR EACH ROW
EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER cards_update_updated_at
BEFORE UPDATE ON cards
FOR EACH ROW
EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER labels_update_updated_at
BEFORE UPDATE ON labels
FOR EACH ROW
EXECUTE FUNCTION update_updated_at();


-- migrate:down
DROP FUNCTION IF EXISTS update_updated_at() CASCADE;
DROP TRIGGER IF EXISTS users_update_updated_at ON users;
DROP TRIGGER IF EXISTS boards_update_updated_at ON boards;
DROP TRIGGER IF EXISTS board_members_update_updated_at ON board_members;
DROP TRIGGER IF EXISTS lists_update_updated_at ON lists;
DROP TRIGGER IF EXISTS cards_update_updated_at ON cards;
DROP TRIGGER IF EXISTS labels_update_updated_at ON labels;
