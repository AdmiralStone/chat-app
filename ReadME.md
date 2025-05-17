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

## Milestone 3: Auth Middleware

- Added `authMiddleware.js` to verify JWT tokens
- Protects routes using the `Authorization: Bearer <token>` header
- Exposes `req.user` to downstream handlers
