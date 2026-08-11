## Architecture

```mermaid
flowchart TD
    WC["Web Client "]

    subgraph Backend
        REST["REST API"]
        WS["WebSocket<br/>Gateway"]
        BL["Business Logic<br/>/ Services"]

        REST --> BL
        WS --> BL
    end

    DB[("PostgreSQL<br/>Database")]

    WC -->|HTTPS| REST
    WC -->|WebSocket| WS
    BL --> DB
```
## Entity Relationship

![Local Image](Domain%20Entities%20Flowchart.png)

## Application Flow

![Local Image](AppFlow.png)

# Architecture Decision Records
## ADR001 Use websockets for real-time updates
### Context
All users in the board shall see modifications in the board in real-time
### Decision