# Entity-Relationship Diagram

Generated from [`prisma/schema.prisma`](../prisma/schema.prisma) — 17 models across access control, factory topology, work orders/boards, traceability, WIP, rack/bin warehouse, quality, and events/alerts/audit.

> Phase 1 ships against typed mock fixtures in `src/lib/mock-data/` (see `src/lib/types.ts`). This schema documents the production data model for Phase 2+.

```mermaid
erDiagram
    Role ||--o{ User : "has many"
    Factory ||--o{ User : "employs"
    Factory ||--o{ ProductionLine : "operates"
    Factory ||--o{ Alert : "scopes"
    Factory ||--o{ AuditLog : "logs"
    Factory ||--o{ ProductionEvent : "scopes"
    Factory ||--o{ RackLocation : "has"

    ProductionLine ||--o{ Machine : "has"
    ProductionLine ||--o{ WorkOrder : "runs"
    ProductionLine ||--o{ WIPRecord : "tracks"
    ProductionLine ||--o{ Alert : "scopes"
    ProductionLine ||--o{ ProductionEvent : "scopes"
    ProductionLine ||--o{ DMCRecord : "scopes"

    Machine ||--o{ ProductionEvent : "scopes"
    Machine ||--o{ DMCRecord : "scopes"
    Machine ||--o{ InspectionRecord : "performs"
    Machine ||--o{ Alert : "scopes"

    WorkOrder ||--o{ Board : "produces"

    Board ||--o{ DMCRecord : "logs"
    Board ||--o| WIPRecord : "has"
    Board ||--o| XOutBoard : "has"
    Board ||--o{ ReworkBoard : "has"
    Board ||--o{ InspectionRecord : "has"
    Board ||--o{ ProductionEvent : "scopes"

    RackLocation ||--o{ BinLocation : "contains"
    BinLocation ||--o{ Board : "stores"

    User ||--o{ DMCRecord : "scans (operator)"
    User ||--o{ AuditLog : "performs"
    User ||--o{ Alert : "acknowledges"
    User ||--o{ Alert : "resolves"
    User ||--o{ ReworkBoard : "assigned to"
    User ||--o{ XOutBoard : "reports"

    Role {
        string id PK
        string name "unique, enum RoleName"
        string description
        json permissions
    }

    User {
        string id PK
        string email "unique"
        string name
        string passwordHash
        string roleId FK
        string factoryId FK
        boolean isActive
        datetime createdAt
        datetime updatedAt
    }

    Factory {
        string id PK
        string name
        string code "unique"
        string location
        string timezone
        datetime createdAt
    }

    ProductionLine {
        string id PK
        string factoryId FK
        string name
        string code "unique"
        enum status "LineStatus"
        int targetThroughput
        int currentThroughput
        datetime createdAt
        datetime updatedAt
    }

    Machine {
        string id PK
        string lineId FK
        string name
        enum type "MachineType"
        int sequence
        enum status "MachineStatus"
        datetime lastHeartbeat
        json metadata
        datetime createdAt
        datetime updatedAt
    }

    WorkOrder {
        string id PK
        string orderNumber "unique"
        string partNumber
        string productName
        string lineId FK
        int quantityPlanned
        int quantityCompleted
        enum status "WorkOrderStatus"
        datetime startDate
        datetime dueDate
        datetime createdAt
    }

    Board {
        string id PK
        string dmcNumber "unique, 16-digit"
        string serialNumber "unique"
        string batchNumber
        string partNumber
        string revision
        string workOrderId FK
        enum status "BoardStatus"
        string currentLineId
        string currentMachineId
        string currentBinId FK
        datetime createdAt
        datetime updatedAt
    }

    DMCRecord {
        string id PK
        string boardId FK
        string dmcNumber
        string lineId FK
        string machineId FK
        string stationCode
        enum eventType "DMCEventType"
        string operatorId FK
        string notes
        datetime timestamp
    }

    WIPRecord {
        string id PK
        string boardId FK "unique"
        string lineId FK
        string currentStation
        datetime enteredStationAt
        boolean isBottleneck
        boolean isOnHold
        string holdReason
        datetime updatedAt
    }

    RackLocation {
        string id PK
        string factoryId FK
        string code "unique"
        string name
        string zone
        int totalBins
        datetime createdAt
    }

    BinLocation {
        string id PK
        string rackId FK
        string code "unique per rack"
        int capacity
        int occupied
    }

    XOutBoard {
        string id PK
        string boardId FK "unique"
        enum reasonCode "XOutReasonCode"
        string defectLocation
        string description
        float impactValue
        string disposition
        string reportedById FK
        datetime reportedAt
    }

    ReworkBoard {
        string id PK
        string boardId FK
        string reworkStation
        string reason
        enum status "ReworkStatus"
        string assignedToId FK
        datetime startedAt
        datetime completedAt
        string notes
        datetime createdAt
    }

    InspectionRecord {
        string id PK
        string boardId FK
        string dmcNumber
        string machineId FK
        enum result "InspectionResult"
        int totalPins
        int defectPins
        float avgHeight "microns"
        float avgVolume "mm^3"
        float avgArea "mm^2"
        json pinData "InspectionPin[]"
        datetime timestamp
    }

    ProductionEvent {
        string id PK
        string factoryId FK
        string lineId FK
        string machineId FK
        string boardId FK
        string eventType
        enum severity "EventSeverity"
        string message
        json metadata
        datetime timestamp
    }

    Alert {
        string id PK
        string factoryId FK
        string lineId FK
        string machineId FK
        enum severity "AlertSeverity"
        enum status "AlertStatus"
        string title
        string message
        string acknowledgedById FK
        datetime acknowledgedAt
        string resolvedById FK
        datetime resolvedAt
        datetime createdAt
    }

    AuditLog {
        string id PK
        string userId FK
        string factoryId FK
        string action
        string entityType
        string entityId
        json details
        string ipAddress
        datetime timestamp
    }
```

## Notes

- All primary keys use `cuid()`. Table names are mapped to `snake_case` via `@@map`.
- `InspectionRecord.pinData` mirrors the `InspectionPin[]` shape (`pinId, x, y, height, volume, area, status, defectType`) from the source Bosch SPI tool — see [`src/lib/types.ts`](../src/lib/types.ts).
- `Board.currentLineId` / `currentMachineId` are denormalized for fast "where is this board right now" lookups on the WIP and Command Center views; `DMCRecord` remains the append-only source of truth for full history.
- `Alert` has two named relations to `User` (`AlertAcknowledgedBy`, `AlertResolvedBy`) to track the acknowledge/resolve workflow independently.
