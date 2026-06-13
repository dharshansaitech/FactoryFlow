# Changelog

All notable changes to FactoryFlow are documented in this file.

## [1.0.0] - 2026-06-13

Initial public release. Covers Phases 1-4 of the roadmap — a complete, fully
navigable UI for an SMT/PCB assembly plant operations console, running on
typed mock data with a Prisma schema documenting the production data model.

### Added

- **Phase 1 — Core Platform**
  - Project scaffold on Next.js 16 (App Router, TypeScript, Turbopack), Tailwind CSS v4, shadcn/ui (Base UI primitives)
  - Industrial dark design system with a 6-color status mapping (Running/Completed/Warning/Hold/Critical/Offline)
  - Prisma schema (17 models) documenting the full PostgreSQL data model
  - Typed mock data layer (`src/lib/mock-data/`) mirroring `src/lib/types.ts`
  - Executive Dashboard (`/`) — plant-wide KPIs (OEE, throughput, yield, WIP, rework, X-Out) with animated tiles and trend charts
  - Factory Command Center (`/command-center`) — per-line cards, machine tiles, live alert feed, activity timeline, driven by a Zustand live-simulation loop (`tick()` every 3s)

- **Phase 2 — PCB Traceability**
  - DMC/serial/batch search (`/traceability`)
  - Full production history timeline with SPI/AOI inspection results

- **Phase 3 — WIP & Rack/Bin Management**
  - WIP Monitoring (`/wip`) — live work-in-progress table with aging, bottleneck, and hold flags
  - Rack & Bin Management (`/racks`) — warehouse rack/bin occupancy with board-to-bin location lookup

- **Phase 4 — X-Out & Production Analytics**
  - X-Out Tracking (`/xout`) — reason codes, defect location, scrap/rework disposition breakdown
  - Production Analytics (`/analytics`) — OEE breakdown (availability/performance/quality), throughput, yield, downtime trends
  - Alert Center (`/alerts`) — unified feed of critical/warning/info alerts across the plant

### Documentation

- Architecture, ERD, API design, and roadmap docs (`docs/`)
- Screenshots and live demo GIF of the Factory Command Center

### Planned (not in this release)

- **Phase 5 — Real-Time Monitoring**: REST API routes, MQTT → API → WebSocket ingestion, live Postgres via Prisma, JWT auth & RBAC, Alert Center actions
- **Phase 6 — AI Manufacturing Copilot**: natural-language queries over KPIs/events/alerts/board history
