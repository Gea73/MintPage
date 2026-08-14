## Entity Relationship

Outdated
![Local Image](Database%20ER.png)

## Schema Reference

### users

| Column        | Type         | Constraints | Notes         |
| ------------- | ------------ | ----------- | ------------- |
| id            | UUID         | PK          |               |
| username      | varchar(255) | UNIQUE      |
| email         | varchar(255) | UNIQUE      |
| password_hash | varchar(255) | NOT NULL    |
| status        | user_status  | NOT NULL    |
| created       | timestamp    |             | DEFAULT NOW() |
| updated       | timestamp    |             | DEFAULT NOW() |

### session_tokens

| Column  | Type         | Constraints | Notes                             |
| ------- | ------------ | ----------- | --------------------------------- |
| id      | UUID         | PK          |                                   |
| hash    | varchar(255) | NOT NULL    | SHA-256                           |
| user_id | UUID         | FK          | References users.id               |
| created | timestamp    | NOT NULL    | DEFAULT NOW()                     |
| expires | timestamp    | NOT NULL    | DEFAULT NOW() + INTERVAL '7 days' |
| valid   | boolean      | NOT NULL    |

### password_reset_tokens

| Column  | Type         | Constraints | Notes                             |
| ------- | ------------ | ----------- | --------------------------------- |
| id      | UUID         | PK          |                                   |
| hash    | varchar(255) | NOT NULL    | SHA-256                           |
| user_id | UUID         | FK          | References users.id               |
| created | timestamp    | NOT NULL    | DEFAULT NOW()                     |
| expires | timestamp    | NOT NULL    | DEFAULT NOW() + INTERVAL '1 hour' |
| valid   | boolean      | NOT NULL    |

### boards

| Column  | Type         | Constraints | Notes         |
| ------- | ------------ | ----------- | ------------- |
| id      | UUID         | PK          |               |
| name    | varchar(255) | NOT NULL    |               |
| version | BIG INT      | NOT NULL    | DEFAULT 0     |
| created | timestamp    | NOT NULL    | DEFAULT NOW() |
| updated | timestamp    | NOT NULL    | DEFAULT NOW() |

### board-members

| Column   | Type        | Constraints | Notes         |
| -------- | ----------- | ----------- | ------------- |
| id       | UUID        | PK          |               |
| board_id | UUID        | FK          |               |
| user_id  | UUID        | FK          |               |
| role     | member_role | NOT NULL    |               |
| created  | timestamp   | NOT NULL    | DEFAULT NOW() |
| updated  | timestamp   | NOT NULL    | DEFAULT NOW() |

### lists

| Column   | Type         | Constraints | Notes                |
| -------- | ------------ | ----------- | -------------------- |
| id       | UUID         | PK          |                      |
| board_id | UUID         | FK          | References boards.id |
| name     | varchar(255) | NOT NULL    |                      |
| position | TEXT         | NOT NULL    | COLLATE "C"          |
| version  | BIG INT      | NOT NULL    | DEFAULT 0            |
| created  | timestamp    | NOT NULL    | DEFAULT NOW()        |
| updated  | timestamp    | NOT NULL    | DEFAULT NOW()        |

### labels

| Column    | Type         | Constraints | Notes                   |
| --------- | ------------ | ----------- | ----------------------- |
| id        | UUID         | PK          |                         |
| board_id  | UUID         | FK          | References boards.id    |
| name      | varchar(255) | NOT NULL    |                         |
| color_hex | varchar(7)   | NOT NULL    | CHECK (color_hex REGEX) |
| version   | BIG INT      | NOT NULL    | DEFAULT 0               |
| created   | timestamp    | NOT NULL    | DEFAULT NOW()           |
| updated   | timestamp    | NOT NULL    | DEFAULT NOW()           |

### cards

| Column      | Type         | Constraints | Notes               |
| ----------- | ------------ | ----------- | ------------------- |
| id          | UUID         | PK          |                     |
| list_id     | UUID         | FK          | References lists.id |
| title       | varchar(255) | NOT NULL    |                     |
| description | varchar(255) |             |                     |
| position    | TEXT         | NOT NULL    | COLLATE "C"         |
| status      | card_status  | NOT NULL    | DEFAULT "pending"   |
| version     | BIG INT      | NOT NULL    | DEFAULT 0           |
| created     | timestamp    | NOT NULL    | DEFAULT NOW()       |
| updated     | timestamp    | NOT NULL    | DEFAULT NOW()       |

### card-labels

| Column   | Type      | Constraints | Notes                |
| -------- | --------- | ----------- | -------------------- |
| id       | UUID      | PK          |                      |
| card_id  | UUID      | FK          | References cards.id  |
| label_id | UUID      | FK          | References labels.id |
| version  | BIG INT   | NOT NULL    | DEFAULT 0            |
| created  | timestamp | NOT NULL    | DEFAULT NOW()        |

## Indexing

### Index List Position

Index to filter all lists in the same board and its positions

```sql
CREATE INDEX lists_board_position_idx
ON lists (board_id, position COLLATE "C");
```

### Index Card Position

Index to filter all cards in the same list and its positions

```sql
CREATE INDEX cards_list_position_idx
ON cards (list_id, position COLLATE "C");
```

## Referential Integry Rules

### IF user is deleted

| Table         | Column  | Behavior          |
| ------------- | ------- | ----------------- |
| session_token | user_id | DELETE ON CASCADE |
| board-member  | user_id | DELETE ON CASCADE |

### IF board is deleted

| Table  | Column   | Behavior          |
| ------ | -------- | ----------------- |
| lists  | board_id | DELETE ON CASCADE |
| labels | board_id | DELETE ON CASCADE |

### IF delete list

| Table | Column  | Behavior          |
| ----- | ------- | ----------------- |
| cards | list_id | DELETE ON CASCADE |

### IF delete card

| Table       | Column  | Behavior          |
| ----------- | ------- | ----------------- |
| card-labels | card_id | DELETE ON CASCADE |

### IF delete label

| Table       | Column   | Behavior          |
| ----------- | -------- | ----------------- |
| card-labels | label_id | DELETE ON CASCADE |

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
