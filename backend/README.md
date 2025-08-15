# HR AI Suite Backend (Express + MongoDB)

An Express.js backend for the HR AI Suite app with MongoDB, JWT auth, and basic routes.

## Prerequisites
- Node.js 18+
- MongoDB running locally at `mongodb://localhost:27017/hr-ai-suite`

## Setup
1. Copy `.env` (already provided):
   ```bash
   MONGODB_URI=mongodb://localhost:27017/hr-ai-suite
   PORT=4000
   JWT_SECRET=change-me-in-prod
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the server (dev):
   ```bash
   npm run dev
   ```
   Or production:
   ```bash
   npm start
   ```

Server listens on `http://localhost:4000` by default.

## Project structure
```
src/
  app.js                 # Express app bootstrap
  config/db.js           # Mongo connection
  middleware/
    auth.js              # Bearer token auth middleware
    error.js             # 404 + error handler
  models/
    user.model.js        # Mongoose User model
  routes/
    auth.routes.js       # /api/auth endpoints
    health.routes.js     # /api/health endpoint
  utils/
    jwt.js               # JWT helpers
```

## API
- Health
  - GET `/api/health` → `{ status: 'ok', uptime }`
- Auth
  - POST `/api/auth/signup` → `{ user, token }`
    - body: `{ name, email, password }`
  - POST `/api/auth/signin` → `{ user, token }`
    - body: `{ email, password }`
  - GET `/api/auth/me` (Authorization: `Bearer <token>`) → `{ user }`

## Notes
- Change `JWT_SECRET` in production.
- CORS is enabled for all origins by default. Adjust in `src/app.js` if needed.
- Mongo will create the database upon first write.
