# Chat Application Dev Log

## Milestone 1: Backend Setup

- Initialized backend using Express
- Configured Knex.js for MySQL using `.env`
- Created structured folders for scalable architecture
- Created base API server on `http://localhost:5001`

## Milestone 2: User Authentication

- Created `tblUsers` table via Knex migration
- Implemented secure registration and login routes
- Passwords hashed using `bcrypt`
- JWT issued for 3 days after login
- Random avatar assigned using DiceBear API
