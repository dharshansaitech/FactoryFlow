# API Design

FactoryFlow Phase 1 reads from typed mock fixtures (`src/lib/mock-data/`) directly in server/client components — there is no API layer yet. This document specifies the REST contract that Phase 2+ implements as Next.js Route Handlers (`src/app/api/**/route.ts`), backed by Prisma (see [ERD.md](ERD.md)).

## Conventions

- Base path: `/api/v1`
- Auth: Bearer JWT (issued at login), role-checked per route against `RoleName`
- Pagination: `?page=1&pageSize=25` → `{ data: [...], page, pageSize, total }`
- Filtering: query params map to model fields, e.g. `?lineId=line-smt-02&status=OPEN`
- Errors: `{ error: { code, message } }` with standard HTTP status codes
- Timestamps: ISO 8601, UTC on the wire; rendered in the factory's `timezone`
- Mutations return the updated resource

## Module Routes

### Executive Dashboard

| Method | Route | Description |
|---|---|---|
| `GET` | `/api/v1/factories/:factoryId/kpis` | Current `KPISummary` (OEE, throughput, yield, WIP, rework, X-Out, efficiency) |
| `GET` | `/api/v1/factories/:factoryId/kpis/trends` | `KPITrends` — throughput/yield/WIP series + per-line utilization |

### Factory Command Center

| Method | Route | Description |
|---|---|---|
| `GET` | `/api/v1/factories/:factoryId/lines` | All `ProductionLine`s with current status/throughput/OEE |
| `GET` | `/api/v1/lines/:lineId/machines` | Machines on a line, ordered by `sequence` |
| `PATCH` | `/api/v1/machines/:machineId` | Update machine `status`/`metadata` (operator/engineer) |
| `GET` | `/api/v1/factories/:factoryId/events?since=` | `ProductionEvent` feed, most recent first |
| `GET` | `/api/v1/factories/:factoryId/alerts?status=OPEN` | Open alerts for the activity sidebar |
| `WS` | `/api/v1/ws/factories/:factoryId` | *(Phase 5)* live `ProductionEvent`/`Alert`/throughput push |

### PCB Traceability *(Phase 2)*

| Method | Route | Description |
|---|---|---|
| `GET` | `/api/v1/boards?dmc=` | Lookup a board by DMC, serial, or batch number |
| `GET` | `/api/v1/boards/:boardId` | Board detail (work order, current location, status) |
| `GET` | `/api/v1/boards/:boardId/history` | Full `DMCRecord` event timeline for the board |
| `GET` | `/api/v1/boards/:boardId/inspections` | `InspectionRecord[]` with pin-level data |
| `POST` | `/api/v1/boards/:boardId/events` | Append a `DMCRecord` (station scan) |

### WIP Monitoring *(Phase 3)*

| Method | Route | Description |
|---|---|---|
| `GET` | `/api/v1/lines/:lineId/wip` | `WIPRecord[]` — current station, aging, bottleneck/hold flags |
| `PATCH` | `/api/v1/wip/:wipRecordId` | Update hold status / reason |

### Rack & Bin Management *(Phase 3)*

| Method | Route | Description |
|---|---|---|
| `GET` | `/api/v1/factories/:factoryId/racks` | `RackLocation[]` with bin occupancy summaries |
| `GET` | `/api/v1/racks/:rackId/bins` | `BinLocation[]` for a rack |
| `PATCH` | `/api/v1/bins/:binId` | Move a board into/out of a bin (updates `Board.currentBinId`) |

### X-Out Tracking *(Phase 4)*

| Method | Route | Description |
|---|---|---|
| `GET` | `/api/v1/factories/:factoryId/xout?reasonCode=` | `XOutBoard[]`, filterable by reason/date |
| `POST` | `/api/v1/boards/:boardId/xout` | Flag a board X-Out (reason, defect location, impact) |
| `PATCH` | `/api/v1/xout/:xoutId` | Set disposition |
| `GET` | `/api/v1/factories/:factoryId/rework` | `ReworkBoard[]` queue, filterable by `status` |
| `PATCH` | `/api/v1/rework/:reworkId` | Assign / update rework status |

### Production Analytics *(Phase 4)*

| Method | Route | Description |
|---|---|---|
| `GET` | `/api/v1/factories/:factoryId/analytics/oee?range=` | OEE breakdown (availability/performance/quality) by line/date range |
| `GET` | `/api/v1/factories/:factoryId/analytics/defects?range=` | Defect Pareto by `DefectType` |
| `GET` | `/api/v1/factories/:factoryId/analytics/throughput?range=` | Throughput vs. target over time |

### Alert Center *(Phase 5)*

| Method | Route | Description |
|---|---|---|
| `GET` | `/api/v1/factories/:factoryId/alerts?status=&severity=` | Alerts, filterable |
| `PATCH` | `/api/v1/alerts/:alertId/acknowledge` | Set `status=ACKNOWLEDGED`, `acknowledgedById/At` |
| `PATCH` | `/api/v1/alerts/:alertId/resolve` | Set `status=RESOLVED`, `resolvedById/At` |

### Auth & Audit

| Method | Route | Description |
|---|---|---|
| `POST` | `/api/v1/auth/login` | Email + password → JWT |
| `GET` | `/api/v1/me` | Current user + role + factory |
| `GET` | `/api/v1/factories/:factoryId/audit-log?entityType=&entityId=` | `AuditLog[]` for compliance views |

## AI Manufacturing Copilot *(Phase 6)*

| Method | Route | Description |
|---|---|---|
| `POST` | `/api/v1/copilot/query` | Natural-language query over KPIs/events/boards, scoped to the user's factory and role |
