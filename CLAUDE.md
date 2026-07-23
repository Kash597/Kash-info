# KASH_INFO — Project Guide

Membership platform with AI-powered tools. Hybrid three-app architecture (after the 2025-11-13 migration off Next.js).

> **Archon retired — 2026-07-23.** This project no longer uses the Archon MCP server or Archon task management. The previous "Archon-first" rules are void; use normal task tracking. (Kash's call.)

## Source of truth for the stack

`STACK_MIGRATION_COMPLETE.md` is authoritative for architecture. **`README.md` is STALE** — it describes the removed Next.js setup. Ignore it.

## Architecture

| Tier | Folder | Stack | Port |
|------|--------|-------|------|
| Public site | `frontend-public/` | Astro 5 + Tailwind v4 + Tina CMS + MDX (SEO site + blog, SSG) | 4321 |
| Member dashboard | `frontend-dashboard/` | Vite 7 + React 19 + TanStack Router/Query + shadcn/ui + Zustand + Supabase auth | 3001 |
| API backend | `backend/` | FastAPI (Python 3.11+, `uv`) + PydanticAI + OpenAI/Anthropic + RAG | 8000 |
| Services | `docker-compose.yml` | Postgres 15 + pgvector · Qdrant · Redis · Supabase stack | — |

## Run (local)

1. Copy each `.env.example` → `.env` (`backend/`, `frontend-dashboard/`, `frontend-public/`); real secrets from the password manager, never committed.
2. `docker-compose up -d`, then `curl http://localhost:8000/health`.
3. Dashboard: `cd frontend-dashboard && npm run dev` (:3001). Public: `cd frontend-public && npm run dev` (:4321).
4. E2E checklist: `INTEGRATION_TEST_REPORT.md`.

## Status

Scaffold complete Nov 2025; never deployed; no `.env` configured. No committed roadmap yet.

> Worked inside the Brava Tactical agency workspace, the higher-level book of record is `Clients/kash_info/CLIENT_STATE.md` (that path exists only in that workspace).
