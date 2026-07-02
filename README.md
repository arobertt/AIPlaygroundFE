# AI Playground — Frontend

*A React + TypeScript interface for testing and comparing LLM prompts across providers.*

![React 19](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=black)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?logo=typescript&logoColor=white)
![MUI](https://img.shields.io/badge/MUI-7-007FFF?logo=mui&logoColor=white)
![React Router](https://img.shields.io/badge/React%20Router-7-CA4245?logo=reactrouter&logoColor=white)

This is the web client for **AI Playground** — a workspace for prompt engineering where you author
prompts, run them against models from multiple AI providers, and compare the rated responses side by
side. It talks to the ASP.NET Core API in
**[AiPlaygroundBE](https://github.com/arobertt/AiPlaygroundBE)**.

## Features

- **Platforms & models** — browse the AI providers and models available to run against.
- **Scopes** — organise prompts into categories, with create / edit / delete.
- **Prompts** — author a prompt (system message, user message, expected result) and manage it.
- **Runs** — launch a prompt against one or more models at chosen temperatures, then review each
  response next to its automatic score and your own rating.

## Tech stack

- **React 19** with **TypeScript**
- **Material UI (MUI)** for components and theming
- **React Router** for navigation
- **Axios** API layer, organised into typed clients (`src/api/Clients`) and models (`src/api/Models`)

## Getting started

### Prerequisites
- [Node.js](https://nodejs.org/) (18+ recommended)
- The backend running locally — see [AiPlaygroundBE](https://github.com/arobertt/AiPlaygroundBE)

### Install & run

```bash
npm install
npm start
```

The app runs at [http://localhost:3000](http://localhost:3000).

> **API base URL** — the client expects the backend at `https://localhost:7004/api/`. If yours runs
> elsewhere, change the `baseURL` in [`src/api/Base/BaseApiClient.ts`](src/api/Base/BaseApiClient.ts).

## Project structure

```
src/
├── api/            # Axios clients and request/response models, grouped by resource
├── components/     # Feature screens (Home, Platforms, Scopes, Prompts, Runs) + shared UI
├── configs/        # Route definitions
└── App.tsx         # Theme + layout shell
```

## Available scripts

| Command | Description |
|---------|-------------|
| `npm start` | Run the dev server with hot reload |
| `npm run build` | Produce an optimised production build |
| `npm test` | Run the test runner |
