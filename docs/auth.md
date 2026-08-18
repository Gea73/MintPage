## Authentication and Authorization

```mermaid
 flowchart TD
    1[Client logs in] -->
    2[Server sends the Access Token and Session Token to the client] -->
    3[Client sends the JWT Access Token to the Server] -->
    4[Server checks the Access Token] -->
    5{Is the Access Token valid?} -->
    6[Client accesses the protected resource or route]

    5 -->|No| 7[Server asks the client to send the Session Token]
    7 --> 8[Server checks the Session Token]
    8 --> 9{Is the Session Token valid?}
    9 -->|Yes| 10[Server issues a new valid Access Token]
    10 --> 6
    9 -->|No| 11[Client is logged out]
```

## Token and Cookie Configuration

### Access Token

- Lifespan: 30 minutes
- JWT
- Stored in an httpOnly Cookie
- SameSite = Strict

### Session Token

- Lifespan: 7 days
- Session Secret (256 bits of cryptographically secure randomness)
- Database store the hash of the session secret
- Stored in an httpOnly Cookie
- SameSite = Strict

## Protected Routes

Whenever the client attempts to access a protected route, the middleware checks the Access Token first.

1. If the Access Token is valid, the client can access the protected resource or route.
2. If the Access Token is invalid, the server asks the client to provide the Session Token.
3. If the Session Token is valid, the server issues a new Access Token.
4. If the Session Token is invalid, the client is logged out.
