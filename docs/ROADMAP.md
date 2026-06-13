# Roadmap

FactoryFlow ships in six phases, moving from a polished frontend on mock data to a fully connected, real-time, AI-assisted MES.

## Phase 1 — Core Platform ✅

**Status: Complete**

- Project scaffold (Next.js 16, TypeScript, Tailwind v4, shadcn/ui, Framer Motion, Recharts, Zustand)
- Industrial dark design system + 6-color status system (`STATUS_STYLES`)
- Full PostgreSQL schema (17 models) + documented seed stub
- Typed mock data layer mirroring the schema 1:1
- App shell: sidebar (8 modules), topbar (factory selector, role switcher, live clock, alert bell), stub pages for unbuilt modules
- **Executive Dashboard** (`/`) — 7 animated KPI tiles, line status strip, throughput/yield/WIP/utilization charts
- **Factory Command Center** (`/command-center`) — per-line cards with machine tiles, live alert feed, activity timeline, Zustand-driven live simulation
- Commercial-grade documentation (this set)

## Phase 2 — PCB Traceability

- `/traceability`: DMC / serial / batch search
- Board detail view: work order, current location, full `DMCRecord` history timeline
- Inspection history grid — revival of the Bosch SPI pin-level view (height/volume/area, pass/warning/fail, defect type) in the new dark theme
- API routes: `boards`, `boards/:id/history`, `boards/:id/inspections`

## Phase 3 — WIP & Rack/Bin Management

- `/wip`: live WIP table — current station, aging time, bottleneck and hold flags, filterable by line
- `/racks`: visual rack/bin warehouse — occupancy heatmap, drill into a bin to see stored boards
- API routes: `lines/:id/wip`, `racks`, `racks/:id/bins`, bin move mutations

## Phase 4 — X-Out & Production Analytics

- `/xout`: X-Out board list with reason codes, defect location, disposition workflow; rework queue (assign, track status)
- `/analytics`: OEE breakdown (availability/performance/quality), defect Pareto by `DefectType`, throughput vs. target trends, date-range filters
- API routes: `xout`, `rework`, `analytics/oee`, `analytics/defects`, `analytics/throughput`

## Phase 5 — Real-Time Monitoring

- `/alerts`: unified Alert Center — acknowledge/resolve workflow, full audit trail via `AuditLog`, escalation rules by severity/role
- Replace the Phase 1 Zustand `tick()` simulation with a real ingestion pipeline: shop-floor MQTT → ingestion API → PostgreSQL → WebSocket/SSE push to clients
- Connect Prisma to a live PostgreSQL instance (Neon/Supabase), run `prisma migrate dev`, execute `prisma/seed.ts`
- Authentication (JWT), role-based access control enforced server-side

## Phase 6 — AI Manufacturing Copilot

- `/api/v1/copilot/query` — natural-language queries over KPIs, events, alerts, and board history, scoped to the user's factory and role
- Example queries: *"Why is SMT Line 03 on hold?"*, *"Show me all X-Out boards from yesterday with solder defects"*, *"Which line has the worst OEE this week and why?"*
- Copilot surfaces inline on the Executive Dashboard and Command Center as a contextual side panel
