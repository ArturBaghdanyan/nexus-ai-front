# Nexus AI — Frontend

Nexus AI is a full-stack AI-powered code analysis tool. It enables developers to perform instant, intelligent code reviews by providing insights into potential bugs, performance bottlenecks, and code quality concerns. Simply paste a GitHub repository link, and the system analyzes the project to provide actionable feedback.

This repository contains the **frontend client** only. It is a Next.js application that talks to a separate [Nexus AI backend](#) (Express/Node.js) over a REST API. All AI processing (Groq LLM calls) and GitHub repository access (via Octokit) happen server-side in the backend — this client never talks to Groq or GitHub directly.

## Key Features
- **Clean UI for code review** — paste a GitHub URL or raw code and get structured, markdown-formatted feedback.
- **History view** — browse past analyses fetched from the backend.
- **Multilingual support** — internationalization via `next-intl`.
- **Thin, secure client** — no AI provider or GitHub credentials live in this project; every sensitive call is proxied through the backend API.

## Tech Stack
- **Framework:** Next.js (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **HTTP client:** Axios
- **Internationalization:** next-intl

## Architecture

```
Next.js (this repo)          Express backend (separate repo)
  ├─ UI components              ├─ /api/generate
  ├─ axios → /api/generate ───► ├─ Octokit (GitHub file fetch)
  └─ NEXT_PUBLIC_API_URL        ├─ Groq (LLM analysis)
                                 └─ MongoDB (history storage)
```

The frontend holds no API keys for Groq, GitHub, or any other AI/data provider. Its only required configuration is the backend's base URL.

## Requirements
- Node.js 20+
- npm or pnpm
- A running instance of the [Nexus AI backend](#)

## Setup

### 1. Install dependencies

```bash
npm install
```

### 2. Environment variables

Create a `.env.local` file in the project root:

```dotenv
NEXT_PUBLIC_API_URL=http://localhost:3005/api
```

This should point to your running backend instance. No other secrets belong in this project — do not add `GROQ_API_KEY`, `GITHUB_TOKEN`, or similar values here; they belong exclusively in the backend's environment.

### 3. Run locally

```bash
npm run dev
```

The app will be available at `http://localhost:3000`.

## Project Structure
- `/app` — Next.js App Router (pages and layouts)
- `/components` — Reusable UI components (Analyze, Result, Header, History)
- `/api` — Client-side API wrapper functions (axios calls to the backend)
- `/messages` — Translation files for i18n support

## Notes
- This project is a **client only**. Repository analysis logic, LLM calls, and GitHub access all live in the separate backend service — see that project's README for setup and required environment variables (`GROQ_API_KEY`, `GITHUB_TOKEN`, `MONGO_URI`).
- Deploy this frontend independently (e.g., Vercel) and point `NEXT_PUBLIC_API_URL` at your deployed backend's URL.