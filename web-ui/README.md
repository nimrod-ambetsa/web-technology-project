# Sodel Web UI

This is the frontend for the Sodel application, built with React, Vite, React Router, and TailwindCSS.

## Table of Contents

- [Features](#features)
- [Requirements](#requirements)
- [Setup](#setup)
- [Available Scripts](#available-scripts)
- [Development Server](#development-server)
- [Build](#build)
- [Project Structure](#project-structure)
- [API Proxy](#api-proxy)
- [License](#license)

---

## Features

- Modern React (v19) with functional components and hooks
- Vite for fast development and build
- React Router for client-side routing
- TailwindCSS for utility-first styling
- ESLint for code quality

## Requirements

- Node.js (v16+ recommended)
- npm

## Setup

1. **Clone the repository:**
   ```bash
   git clone <repo-url>
   cd web-ui
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

## Available Scripts

- `npm run dev` — Start the development server with hot module reload
- `npm run build` — Build the app for production
- `npm run preview` — Preview the production build locally
- `npm run lint` — Run ESLint on the codebase

## Development Server

Start the development server with:

```bash
npm run dev
```

The app will be available at [http://localhost:5173](http://localhost:5173) by default.

## Build

To create a production build:

```bash
npm run build
```

To preview the production build locally:

```bash
npm run preview
```

## Project Structure

- `src/` — Main source code
  - `main.jsx` — App entry point
  - `App.jsx` — Main app component
  - `components/` — Reusable React components
  - `assets/` — Static assets
  - `index.css`, `App.css` — Stylesheets

## API Proxy

API requests to `/api` are proxied to the backend server at `http://localhost:8080` during development (see `vite.config.js`).  
This allows seamless integration with the backend without CORS issues.

## License

This project is licensed under the ISC License.
