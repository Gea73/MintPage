## Domain Entity Design

![Local Image](./images/Domain%20Entities%20Flowchart.png)


## Entity Overview

| Entity | Description |
|---|---|
| `User` | Represents a user account |
| `SessionToken` | Represents an authenticated user session |
| `PasswordResetToken` | Represents a token used to reset a user's password |
| `Board` | Represents a collaborative board owned by a user |
| `BoardMember` | Represents a user's membership and role within a board |
| `List` | Represents a list within a board |
| `Card` | Represents a card within a list |
| `Label` | Represents a label that can be associated with cards on a board |
| `CardLabel` | Represents the association between a card and a label |

---

# User

Represents a user account within the system.

## Attributes

| Attribute | Type | Description |
|---|---|---|
| `id` | UUID | Unique identifier for the user |
| `username` | String | User's unique username |
| `email` | String | User's email address |
| `status` | UserStatus | Current status of the user account |

## Behavior

| Method | Description |
|---|---|
| `verifyUser()` | Verifies the user's account |
| `changeUsername()` | Changes the user's username |
| `deleteAccount()` | Deletes or deactivates the user's account |

## Relationships

- A `User` can have multiple `SessionToken`s.
- A `User` can have multiple `PasswordResetToken`s.
- A `User` can own multiple `Board`s.
- A `User` can be a member of multiple `Board`s through `BoardMember`.

---

# SessionToken

Represents an authenticated session belonging to a user.

## Attributes

| Attribute | Type | Description |
|---|---|---|
| `id` | UUID | Unique identifier for the session token |
| `userId` | UUID | ID of the associated user |
| `hash` | String | Hashed session token |

## Behavior

| Method | Description |
|---|---|
| `isValid()` | Determines whether the session token is valid |
| `revoke()` | Revokes the session token |
| `refresh()` | Refreshes the session token |

## Relationships

- A `SessionToken` belongs to one `User`.
- A `User` can have multiple `SessionToken`s.

---

# PasswordResetToken

Represents a token used to authenticate a password reset operation.

## Attributes

| Attribute | Type | Description |
|---|---|---|
| `id` | UUID | Unique identifier for the reset token |
| `userId` | UUID | ID of the associated user |
| `hash` | String | Hashed password reset token |

## Behavior

| Method | Description |
|---|---|
| `isValid()` | Determines whether the reset token is valid |
| `revoke()` | Revokes the reset token |

## Relationships

- A `PasswordResetToken` belongs to one `User`.
- A `User` can have multiple `PasswordResetToken`s.

---

# Board

Represents a collaborative board owned by a user.

## Attributes

| Attribute | Type | Description |
|---|---|---|
| `id` | UUID | Unique identifier for the board |
| `ownerId` | UUID | ID of the user who owns the board |
| `name` | String | Name of the board |
| `version` | Integer | Version used for tracking board changes |

## Behavior

| Method | Description |
|---|---|
| `addMember()` | Adds a user as a member of the board |
| `removeMember()` | Removes a member from the board |
| `changeMemberRole()` | Changes a member's role |
| `renameBoard()` | Changes the board's name |
| `deleteBoard()` | Deletes the board |
| `createList()` | Creates a new list on the board |
| `deleteList()` | Deletes a list from the board |
| `moveList()` | Moves a list within the board |
| `createLabel()` | Creates a new label on the board |
| `deleteLabel()` | Deletes a label from the board |

## Relationships

- A `Board` belongs to one `User` as its owner.
- A `Board` can have multiple `BoardMember`s.
- A `Board` can contain multiple `List`s.
- A `Board` can contain multiple `Label`s.

---

# BoardMember

Represents a user's membership in a board and their role within that board.

## Attributes

| Attribute | Type | Description |
|---|---|---|
| `id` | UUID | Unique identifier for the membership |
| `boardId` | UUID | ID of the associated board |
| `userId` | UUID | ID of the associated user |
| `role` | BoardMemberRole | Role of the user on the board |

## Relationships

- A `BoardMember` belongs to one `Board`.
- A `BoardMember` belongs to one `User`.
- A `Board` can have multiple `BoardMember`s.
- A `User` can belong to multiple `Board`s through `BoardMember`.

---

# List

Represents a list containing cards within a board.

## Attributes

| Attribute | Type | Description |
|---|---|---|
| `id` | UUID | Unique identifier for the list |
| `boardId` | UUID | ID of the board containing the list |
| `name` | String | Name of the list |
| `position` | Integer | Position of the list within the board |
| `version` | Integer | Version used for tracking list changes |

## Behavior

| Method | Description |
|---|---|
| `renameList()` | Changes the name of the list |
| `createCard()` | Creates a new card in the list |
| `deleteCard()` | Deletes a card from the list |
| `moveCard()` | Moves a card within or between lists |

## Relationships

- A `List` belongs to one `Board`.
- A `List` can contain multiple `Card`s.
- A `Board` can contain multiple `List`s.

---

# Card

Represents an individual task or item within a list.

## Attributes

| Attribute | Type | Description |
|---|---|---|
| `id` | UUID | Unique identifier for the card |
| `listId` | UUID | ID of the list containing the card |
| `title` | String | Title of the card |
| `description` | String | Description of the card |
| `status` | CardStatus | Current status of the card |
| `position` | Integer | Position of the card within its list |
| `version` | Integer | Version used for tracking card changes |

## Behavior

| Method | Description |
|---|---|
| `renameCard()` | Changes the card's title |
| `changeStatus()` | Changes the card's status |
| `changeDescription()` | Changes the card's description |
| `addLabel()` | Associates a label with the card |
| `removeLabel()` | Removes a label from the card |

## Relationships

- A `Card` belongs to one `List`.
- A `Card` can have multiple `Label`s through `CardLabel`.
- A `List` can contain multiple `Card`s.

---

# Label

Represents a reusable label that can be assigned to cards on a board.

## Attributes

| Attribute | Type | Description |
|---|---|---|
| `id` | UUID | Unique identifier for the label |
| `boardId` | UUID | ID of the board containing the label |
| `name` | String | Name of the label |
| `colorHex` | String | Hexadecimal color associated with the label |
| `version` | Integer | Version used for tracking label changes |

## Behavior

| Method | Description |
|---|---|
| `renameLabel()` | Changes the label's name |
| `changeColor()` | Changes the label's color |

## Relationships

- A `Label` belongs to one `Board`.
- A `Label` can be associated with multiple `Card`s through `CardLabel`.
- A `Board` can contain multiple `Label`s.

---

# CardLabel

Represents the association between a `Card` and a `Label`.

This entity acts as the join entity for the many-to-many relationship
between cards and labels.

## Attributes

| Attribute | Type | Description |
|---|---|---|
| `id` | UUID | Unique identifier for the association |
| `cardId` | UUID | ID of the associated card |
| `labelId` | UUID | ID of the associated label |
| `version` | Integer | Version used for tracking association changes |

## Relationships

- A `CardLabel` belongs to one `Card`.
- A `CardLabel` belongs to one `Label`.
- A `Card` can have multiple `CardLabel`s.
- A `Label` can have multiple `CardLabel`s.

---

# Relationships

The primary relationships between the domain entities are:

```text
User
 ├── 1:N ── SessionToken
 ├── 1:N ── PasswordResetToken
 ├── 1:N ── Board (as owner)
 └── N:N ── Board
             │
             └── BoardMember

Board
 ├── 1:N ── BoardMember
 ├── 1:N ── List
 └── 1:N ── Label

List
 └── 1:N ── Card

Card
 └── N:N ── Label
             │
             └── CardLabel