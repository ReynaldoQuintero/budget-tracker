# Budget Tracker

A full-stack web application for managing personal budgets, built with Angular, Express, MySQL, and Google authentication.

## Tech Stack

- **Frontend:** Angular 19, Angular Material
- **Backend:** Node.js, Express
- **Database:** MySQL (auto-initialized on server start)
- **Authentication:** Passport.js (Google OAuth 2.0)
- **Session Management:** express-session
- **Server-Side Rendering:** Angular SSR

## Features

- Google OAuth login
- User session management
- Budget, category, subcategory, expense, and receivable tracking
- Responsive UI with Angular Material
- MySQL database with auto-migration

## Project Structure

- `src/views/` — Angular app (UI, routes, styles)
- `src/controllers/` — Express route controllers
- `src/models/` — Database models, schema, and interfaces
- `src/utils/` — Passport.js configuration
- `server.ts` — Express server entry point

## Prerequisites

- Node.js (v18+ recommended)
- MySQL server
- Google OAuth credentials (see `.env`)

## Setup

1. **Clone the repository**

   ```sh
   git clone <your-repo-url>
   cd budget-tracker
   ```

2. **Install dependencies**

   ```sh
   npm install
   ```

3. **Configure environment variables**

   Copy `.env` and update values as needed:

   ```
   DB_HOST=localhost
   DB_USER=root
   DB_PASSWORD=your_mysql_password
   DB_NAME=budget_tracker
   SESSION_SECRET=your_session_secret
   GOOGLE_CLIENT_ID=your_google_client_id
   GOOGLE_CLIENT_SECRET=your_google_client_secret
   ```

4. **Start MySQL**

   Make sure your MySQL server is running and accessible.

5. **Run the app in development mode**

   ```sh
   npm start
   ```

   The app will be available at [http://localhost:4200](http://localhost:4200).

6. **Run the server with SSR (optional)**

   Build the app and start the SSR server:

   ```sh
   npm run build
   npm run serve:ssr:budget-tracker
   ```

   The SSR server will run on [http://localhost:4000](http://localhost:4000) by default.

## Running Tests

```sh
npm test
```

## Notes

- The database schema is initialized automatically on server start.
- Google OAuth requires valid credentials set in `.env`.
- For production, set `NODE_ENV=production` and use secure session secrets.

---