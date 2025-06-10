# Sodel Backend

This is the backend service for the Sodel application, built with Node.js, Express, Sequelize, and PostgreSQL.

## Table of Contents

- [Features](#features)
- [Requirements](#requirements)
- [Setup](#setup)
- [Database Setup](#database-setup)
- [Running the Server](#running-the-server)
- [API Endpoints](#api-endpoints)
- [Environment Variables](#environment-variables)
- [Development](#development)
- [License](#license)

---

## Features

- User authentication for "Hirer" and "Hiree" roles
- RESTful API endpoints
- PostgreSQL database with Sequelize ORM
- JWT-based authentication
- CORS enabled for frontend integration

## Requirements

- Node.js (v16+ recommended)
- npm
- PostgreSQL

## Setup

1. **Clone the repository:**
   ```bash
   git clone <repo-url>
   cd backend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

## Database Setup

1. **Configure your database:**

   Edit `config/config.js` to match your local PostgreSQL setup. Default credentials:
   - username: `admin`
   - password: `root`
   - database: `sodel_db`
   - host: `127.0.0.1`
   - dialect: `postgres`

2. **Create the database:**
   ```bash
   createdb sodel_db
   ```

3. **Run migrations:**
   ```bash
   npx sequelize-cli db:migrate
   ```

## Running the Server

Start the development server with:

```bash
npm start
```

The server will run on [http://localhost:8080](http://localhost:8080).

## API Endpoints

- `POST /api/hirer/register` — Register a new hirer
- `POST /api/hirer/login` — Login as hirer
- `POST /api/hiree/register` — Register a new hiree
- `POST /api/hiree/login` — Login as hiree

(See controller files for more details.)

## Environment Variables

You can use a `.env` file for sensitive configuration (recommended, though not required by default):

- `JWT_SECRET` — Secret key for JWT signing (default in code: `'your_jwt_secret_key'`)
- `NODE_ENV` — Set to `development`, `test`, or `production`

**Note:** `.env` is included in `.gitignore`.

## Development

- Uses `nodemon` for auto-reloading.
- Sequelize CLI for migrations and model management.

## License

This project is licensed under the ISC License.
