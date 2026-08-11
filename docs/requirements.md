## Overview
A application to manage Kanban Boards online where multiple users can see and modify a shared Kanban board at same time


## Functional Requirements
- FR001 Users can create accounts and login
- FR002 Users can create/edit/delete boards
- FR003 Users can share boards with other users
- FR004 Users have different roles in each board (Admin / Editor / Reader)
- FR005 Users can create/edit/delete columns/lists in the board
- FR006 Users can create/edit/delete cards in the lists
- FR007 Users can move columns position in the board
- FR008 Users can move cards position in the current column or move to other columns
- FR009 Users can create/edit/delete labels in the board
- FR010 Users can add/remove labels from cards
- FR011 User can mark cards as completed
## Non Funcional Requirements
- NFR001 The changes must appear in real time to all users seeing the board less than 500ms
- NFR002 Must have low latency less than 200ms
- NFR003 Must implement security measures to mitigate DDoS, Sql Injection, Cross Script (XSS), Cross-Site Request Forgery (CSRF) and Brute Force attacks
- NFR004 Sensitive data must be encrypted in both transit and database
- NFR005 Must maintain data consistency when users modify the same board concurrently avoiding data loss and inconsistent state