<div align="center">
  <img src="frontend/src/assets/sac-patch.png" alt="Striker Airmen Coders Starter Kit" width="300" />
  <p></p>
  <h1>MyDorms</h1>
  <p style="margin-top: -20px;">Express/React Starter Kit<p>
  <p></p>
</div>

# Getting Started

Clone and modify this repo
```#!bash
  git clone git@github.com:therubyshore/sac-mydorms.git <project-name>
  cd <project_name>
  rm -rf .git && git init
```

Copy env files
```#!bash
  cp .env.example .env
  cp backend/.env.example backend/.env
  cp frontend/.env.example frontend/.env
```

If using Host Machine (on MacOS) (Recommended unless you need/want to use Docker)
- Install [Node.js](https://nodejs.org/en/download)
- Install [PostgreSQL](https://postgresapp.com)

```#!bash
  createdb mydorms_dev
  npm run install:all
  cd backend
    npx prisma generate
    npx prisma db push
    npx prisma db seed
  cd ..
  npm run dev
```

If using Docker
- Install [Docker Desktop](https://www.docker.com/products/docker-desktop)

```#!bash
  # Update backend/.env DATABASE_URL: rename `localhost` to `postgres`
  docker compose up -d
  docker compose exec postgres createdb -U postgres mydorms_dev
  docker compose exec backend npx prisma db push
  docker compose exec backend npx prisma db seed
```

Visit `http://localhost:3000`

# Tech Stack
## Backend

- Language: [Javascript](https://www.javascript.com)
- Framework: [Express](https://expressjs.com)
- ORM: [Prisma](https://www.prisma.io)
- API: [REST](https://restfulapi.net)
- Authentication: [Passport](http://www.passportjs.org)
- Testing: [Jest](https://jestjs.io)
- Exceptions: [Sentry](https://sentry.io)
- Docs
  - [💻 Application Overview](backend/docs/application-overview.md)
  - [⚙️ Project Configuration](backend/docs/project-configuration.md)
  - [👁️ Style Guide](backend/docs/style-guide.md)
  - [🗄️ Project Structure](backend/docs/project-structure.md)
  - [💽 Data Layer](backend/docs/data-layer.md)
  - [🧪 Testing](backend/docs/testing.md)
  - [⚠️ Error Handling](backend/docs/error-handling.md)
  - [🔐 Security](backend/docs/security.md)
  - [🚄 Performance](backend/docs/performance.md)
  - [📚 Additional Resources](backend/docs/additional-resources.md)

##  Frontend

- Language: [Javascript](https://www.javascript.com)
- Framework: [Create React App](https://reactjs.org/docs/create-a-new-react-app.html#create-react-app)
- CSS: [Emotion](https://emotion.sh)
- UI Components: [Material-UI](https://material-ui.com/)
- API Client: [React Query](https://react-query.tanstack.com)
- State: [Zustand](https://zustand.surge.sh)
- Testing: [Jest](https://jestjs.io) / [Cypress](https://www.cypress.io)
- Exception Tracking: [Sentry](https://sentry.io)
- Docs
  - [💻 Application Overview](frontend/docs/application-overview.md)
  - [⚙️ Project Configuration](frontend/docs/project-configuration.md)
  - [👁️ Style Guide](frontend/docs/style-guide.md)
  - [🗄️ Project Structure](frontend/docs/project-structure.md)
  - [🚅 Routing](frontend/docs/routing.md)
  - [🧱 Components And Styling](frontend/docs/components-and-styling.md)
  - [📡 API Layer](frontend/docs/api-layer.md)
  - [🗃️ State Management](frontend/docs/state-management.md)
  - [🧪 Testing](frontend/docs/testing.md)
  - [⚠️ Error Handling](frontend/docs/error-handling.md)
  - [🔐 Security](frontend/docs/security.md)
  - [🚄 Performance](frontend/docs/performance.md)
  - [📚 Additional Resources](frontend/docs/additional-resources.md)


# Workflow

- Pick up or create a task from [Pivotal Tracker](https://pivotaltracker.com/)
- Write out the details of that task if they don't already exist
- "Start" the task
- Checkout a new feature branch from main
- Begin working out feature locally
- Ensure test suite passes and your new code is covered
- Add and commit files to feature branch
- Open a PR (draft or ready) and ensure test suite passes


# Sources and Thanks

This kit is a combination of material and ideas from the open source community, namely:
- [🛡️ Bulletproof Node.js](https://github.com/santiq/bulletproof-nodejs)
- [🛡️ Bulletproof React](https://github.com/alan2207/bulletproof-react)

Kudos to them! 🎉

Of course, this kit is in no way a 1 to 1 to those, there have been _heavy_ modifications and additions, but we can occasionally reference those sources to see if there are new ideas we want to incorporate.
