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

| Column   | Type        | Constraints | Notes         |
| -------- | ----------- | ----------- | ------------- |
| id       | UUID        | PK          |               |
| board_id | UUID        | FK          |               |
| user_id  | UUID        | FK          |               |
| role     | member_role | NOT NULL    |               |
| created  | timestamp   | NOT NULL    | DEFAULT NOW() |
| updated  | timestamp   | NOT NULL    | DEFAULT NOW() |

## Referential Integry Rules

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
