## Entity Relationship

Outdated
![Local Image](./images/Database%20ER.png)

## Schema Reference

### users

| Column        | Type         | Constraints      | Notes         |
| ------------- | ------------ | ---------------- | ------------- |
| id            | UUID         | PK               |               |
| username      | varchar(255) | NOT NULL, UNIQUE |
| email         | varchar(255) | NOT NULL, UNIQUE |
| password_hash | varchar(255) | NOT NULL         |
| status        | user_status  | NOT NULL         |
| created_at    | timestamp    |                  | DEFAULT NOW() |
| updated_at    | timestamp    |                  | DEFAULT NOW() |

### session_tokens

| Column     | Type         | Constraints | Notes                             |
| ---------- | ------------ | ----------- | --------------------------------- |
| id         | UUID         | PK          |                                   |
| hash       | varchar(255) | NOT NULL    | SHA-256                           |
| user_id    | UUID         | FK          | References users.id               |
| created_at | timestamp    | NOT NULL    | DEFAULT NOW()                     |
| expires_at | timestamp    | NOT NULL    | DEFAULT NOW() + INTERVAL '7 days' |
| valid      | boolean      | NOT NULL    |

### password_reset_tokens

| Column     | Type         | Constraints | Notes                             |
| ---------- | ------------ | ----------- | --------------------------------- |
| id         | UUID         | PK          |                                   |
| hash       | varchar(255) | NOT NULL    | SHA-256                           |
| user_id    | UUID         | FK          | References users.id               |
| created_at | timestamp    | NOT NULL    | DEFAULT NOW()                     |
| expires_at | timestamp    | NOT NULL    | DEFAULT NOW() + INTERVAL '1 hour' |
| valid      | boolean      | NOT NULL    |

### boards

| Column     | Type         | Constraints | Notes               |
| ---------- | ------------ | ----------- | ------------------- |
| id         | UUID         | PK          |                     |
| owner_id   | UUID         | FK          | References users.id |
| name       | varchar(255) | NOT NULL    |                     |
| version    | BIG INT      | NOT NULL    | DEFAULT 0           |
| created_at | timestamp    | NOT NULL    | DEFAULT NOW()       |
| updated_at | timestamp    | NOT NULL    | DEFAULT NOW()       |

### board_members

| Column     | Type        | Constraints                    | Notes                |
| ---------- | ----------- | ------------------------------ | -------------------- |
| id         | UUID        | PK                             |                      |
| board_id   | UUID        | FK, UNIQUE (board_id, user_id) | References boards.id |
| user_id    | UUID        | FK, UNIQUE (board_id, user_id) | References users.id  |
| role       | member_role | NOT NULL                       |                      |
| created_at | timestamp   | NOT NULL                       | DEFAULT NOW()        |
| updated_at | timestamp   | NOT NULL                       | DEFAULT NOW()        |

### lists

| Column     | Type         | Constraints | Notes                |
| ---------- | ------------ | ----------- | -------------------- |
| id         | UUID         | PK          |                      |
| board_id   | UUID         | FK          | References boards.id |
| name       | varchar(255) | NOT NULL    |                      |
| position   | TEXT         | NOT NULL    | COLLATE "C"          |
| version    | BIG INT      | NOT NULL    | DEFAULT 0            |
| created_at | timestamp    | NOT NULL    | DEFAULT NOW()        |
| updated_at | timestamp    | NOT NULL    | DEFAULT NOW()        |

### labels

| Column     | Type         | Constraints | Notes                                   |
| ---------- | ------------ | ----------- | --------------------------------------- |
| id         | UUID         | PK          |                                         |
| board_id   | UUID         | FK          | References boards.id                    |
| name       | varchar(255) | NOT NULL    |                                         |
| color_hex  | varchar(7)   | NOT NULL    | CHECK (color_hex ~ '^#[0-9A-Fa-f]{6}$') |
| version    | BIG INT      | NOT NULL    | DEFAULT 0                               |
| created_at | timestamp    | NOT NULL    | DEFAULT NOW()                           |
| updated_at | timestamp    | NOT NULL    | DEFAULT NOW()                           |

### cards

| Column      | Type         | Constraints | Notes               |
| ----------- | ------------ | ----------- | ------------------- |
| id          | UUID         | PK          |                     |
| list_id     | UUID         | FK          | References lists.id |
| title       | varchar(255) | NOT NULL    |                     |
| description | TEXT         |             |                     |
| position    | TEXT         | NOT NULL    | COLLATE "C"         |
| status      | card_status  | NOT NULL    | DEFAULT "pending"   |
| version     | BIG INT      | NOT NULL    | DEFAULT 0           |
| created_at  | timestamp    | NOT NULL    | DEFAULT NOW()       |
| updated_at  | timestamp    | NOT NULL    | DEFAULT NOW()       |

### card_labels

| Column     | Type      | Constraints                    | Notes                |
| ---------- | --------- | ------------------------------ | -------------------- |
| id         | UUID      | PK                             |                      |
| card_id    | UUID      | FK, UNIQUE (card_id, label_id) | References cards.id  |
| label_id   | UUID      | FK, UNIQUE (card_id, label_id) | References labels.id |
| version    | BIG INT   | NOT NULL                       | DEFAULT 0            |
| created_at | timestamp | NOT NULL                       | DEFAULT NOW()        |

## Indexing

### Index Board Members

Index to filter all members of a board

```sql
CREATE INDEX board_members_board_id_idx
ON board_member (board_id);
```

### Index Session UserId

Index to filter all session_tokens that belong to the same user

```sql
CREATE INDEX session_token_user_id_idx
ON session_tokens (user_id);
```

### Index Reset Password UserId

Index to filter all reset_password_tokens that belong to the same user

```sql
CREATE INDEX reset_password_token_user_id_idx
ON reset_password_tokens (user_id);
```

### Index List Position

Index to filter all lists in the same board and its positions

```sql
CREATE INDEX lists_board_id__position_idx
ON lists (board_id, position COLLATE "C");
```

### Index Card Position

Index to filter all cards in the same list and its positions

```sql
CREATE INDEX cards_list_id_position_idx
ON cards (list_id, position COLLATE "C");
```

## Referential Integry Rules

### IF user is deleted

| Table           | Column   | Behavior          |
| --------------- | -------- | ----------------- |
| session_tokens  | user_id  | DELETE ON CASCADE |
| password_tokens | user_id  | DELETE ON CASCADE |
| board_members   | user_id  | DELETE ON CASCADE |
| boards          | owner_id | DELETE ON CASCADE |

### IF board is deleted

| Table         | Column   | Behavior          |
| ------------- | -------- | ----------------- |
| lists         | board_id | DELETE ON CASCADE |
| labels        | board_id | DELETE ON CASCADE |
| board_members | user_id  | DELETE ON CASCADE |

### IF delete list

| Table | Column  | Behavior          |
| ----- | ------- | ----------------- |
| cards | list_id | DELETE ON CASCADE |

### IF delete card

| Table       | Column  | Behavior          |
| ----------- | ------- | ----------------- |
| card_labels | card_id | DELETE ON CASCADE |

### IF delete label

| Table       | Column   | Behavior          |
| ----------- | -------- | ----------------- |
| card_labels | label_id | DELETE ON CASCADE |

## Enums

### user_status

- unverified (User didn't verify his email)
- verified (User email verified)
- suspended (User suspended)

### member_role

- owner (All permissions)
- admin (Can manage members but not other admins)
- editor (Can edit but not manage members)
- reader (Can only view)

### card_status

- pending (Unmarked)
- done (Marked)

## Triggers

### updated_at Trigger

Whenever a record is modified the updated_at shall be updated

Function

```sql
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

```

users

```sql
CREATE TRIGGER users_update_updated_at
BEFORE UPDATE ON users
FOR EACH ROW
EXECUTE FUNCTION update_updated_at();

```

boards

```sql
CREATE TRIGGER boards_update_updated_at
BEFORE UPDATE ON boards
FOR EACH ROW
EXECUTE FUNCTION update_updated_at();

```

board_members

```sql
CREATE TRIGGER board_members_update_updated_at
BEFORE UPDATE ON board_members
FOR EACH ROW
EXECUTE FUNCTION update_updated_at();

```

lists

```sql
CREATE TRIGGER lists_update_updated_at
BEFORE UPDATE ON lists
FOR EACH ROW
EXECUTE FUNCTION update_updated_at();

```

cards

```sql
CREATE TRIGGER cards_update_updated_at
BEFORE UPDATE ON cards
FOR EACH ROW
EXECUTE FUNCTION update_updated_at();

```

labels

```sql
CREATE TRIGGER labels_update_updated_at
BEFORE UPDATE ON labels
FOR EACH ROW
EXECUTE FUNCTION update_updated_at();

```
