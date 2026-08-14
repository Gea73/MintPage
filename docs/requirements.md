## Overview
A application for managing Kanban Boards online, where multiple users can view and modify a shared Kanban board simultaneously


## Functional Requirements
- FR001 Users can create accounts and login
- FR002 Users can create,edit and delete boards
- FR003 Users can share boards with other users
- FR004 Users have different roles in each board (Admin / Editor / Reader)
- FR005 Users can create,edit and delete lists on a board
- FR006 Users can create,edit and delete cards in the lists
- FR007 Users can change the position of lists on the board
- FR008 Users can change the position of cards within the current list or move them to other lists
- FR009 Users can create,edit and delete labels on a board
- FR010 Users can add and remove labels from cards
- FR011 User can mark cards as completed
## Non-Funcional Requirements
- NFR001 Changes must appear in real time to all users viewing the board within 500ms
- NFR002 The application must maintain a latency of less than 200ms
- NFR003 The application must implement security measures to mitigate DDoS, SQL Injection, Cross-Site-Scripting (XSS), Cross-Site Request Forgery (CSRF) and brute-force attacks
- NFR004 Sensitive data must be encrypted both in transit and at rest in the database
- NFR005 The application must maintain data consistency when multiple users modify the same board concurrently, preventing data loss and inconsistent states