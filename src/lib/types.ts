/**
 * Shared domain types for FactoryFlow.
 *
 * These interfaces mirror the Prisma models in `prisma/schema.prisma`
 * field-for-field. Phase 1 populates them from typed fixtures in
 * `src/lib/mock-data/`; once a database is connected, the same shapes
 * come back from `@/generated/prisma` and no UI code needs to change.
 */

// =====================================================================
// ENUM-EQUIVALENT UNIONS
// =====================================================================

export type RoleName =
  | "OPERATOR"
  | "SUPERVISOR"
  | "ENGINEER"
  | "QUALITY_ENGINEER"
  | "PLANT_MANAGER"
  | "DIRECTOR"
  | "ADMIN";

export type LineStatus = "RUNNING" | "IDLE" | "HOLD" | "MAINTENANCE" | "OFFLINE";

export type MachineType =
  | "PRINTER"
  | "SPI"
  | "PLACEMENT"
  | "REFLOW"
  | "AOI"
  | "ICT"
  | "FCT"
  | "DEPANEL";

export type MachineStatus = "RUNNING" | "WARNING" | "HOLD" | "CRITICAL" | "OFFLINE";

export type BoardStatus =
  | "IN_PROGRESS"
  | "COMPLETED"
  | "HOLD"
  | "REWORK"
  | "XOUT"
  | "SHIPPED";

export type WorkOrderStatus =
  | "PLANNED"
  | "RELEASED"
  | "IN_PROGRESS"
  | "COMPLETED"
  | "CLOSED"
  | "ON_HOLD";

export type DMCEventType =
  | "PANEL_LOADED"
  | "STATION_ENTRY"
  | "STATION_EXIT"
  | "INSPECTION"
  | "HOLD_APPLIED"
  | "HOLD_RELEASED"
  | "REWORK_START"
  | "REWORK_COMPLETE"
  | "XOUT_FLAGGED"
  | "SHIPPED";

export type AlertSeverity = "CRITICAL" | "WARNING" | "INFO";

export type AlertStatus = "OPEN" | "ACKNOWLEDGED" | "RESOLVED";

export type InspectionResult = "PASS" | "WARNING" | "FAIL";

export type DefectType =
  | "NONE"
  | "INSUFFICIENT"
  | "EXCESSIVE"
  | "BRIDGING"
  | "MISSING"
  | "MISALIGNED"
  | "TOMBSTONE";

export type XOutReasonCode =
  | "SOLDER_DEFECT"
  | "COMPONENT_DEFECT"
  | "MISALIGNMENT"
  | "DAMAGE"
  | "CONTAMINATION"
  | "WRONG_PART"
  | "OTHER";

export type ReworkStatus = "QUEUED" | "IN_PROGRESS" | "COMPLETED" | "SCRAPPED";

export type EventSeverity = "INFO" | "WARNING" | "CRITICAL";

// =====================================================================
// ACCESS CONTROL
// =====================================================================

export interface Role {
  id: string;
  name: RoleName;
  description?: string | null;
}

export interface User {
  id: string;
  email: string;
  name: string;
  roleId: string;
  roleName: RoleName;
  factoryId?: string | null;
  isActive: boolean;
}

// =====================================================================
// FACTORY / LINE / MACHINE
// =====================================================================

export interface Factory {
  id: string;
  name: string;
  code: string;
  location: string;
  timezone: string;
}

export interface ProductionLine {
  id: string;
  factoryId: string;
  name: string;
  code: string;
  status: LineStatus;
  targetThroughput: number;
  currentThroughput: number;
  /** Active work order driving this line right now, if any */
  activeWorkOrderId?: string | null;
  /** OEE percentage (0-100) for this line, current shift */
  oee: number;
  yieldPct: number;
  updatedAt: string;
}

export interface Machine {
  id: string;
  lineId: string;
  name: string;
  type: MachineType;
  sequence: number;
  status: MachineStatus;
  lastHeartbeat: string;
  /** Free-form metrics shown on the machine tile, e.g. cycle time, temp */
  metrics?: Record<string, string | number>;
}

// =====================================================================
// WORK ORDERS / BOARDS
// =====================================================================

export interface WorkOrder {
  id: string;
  orderNumber: string;
  partNumber: string;
  productName: string;
  lineId: string;
  quantityPlanned: number;
  quantityCompleted: number;
  status: WorkOrderStatus;
  startDate: string;
  dueDate: string;
}

export interface Board {
  id: string;
  dmcNumber: string;
  serialNumber: string;
  batchNumber: string;
  partNumber: string;
  revision: string;
  workOrderId: string;
  status: BoardStatus;
  currentLineId?: string | null;
  currentMachineId?: string | null;
  currentBinId?: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface DMCRecord {
  id: string;
  boardId: string;
  dmcNumber: string;
  lineId?: string | null;
  machineId?: string | null;
  stationCode: string;
  eventType: DMCEventType;
  operatorId?: string | null;
  operatorName?: string | null;
  notes?: string | null;
  timestamp: string;
}

export interface WIPRecord {
  id: string;
  boardId: string;
  lineId: string;
  currentStation: string;
  enteredStationAt: string;
  agingMinutes: number;
  isBottleneck: boolean;
  isOnHold: boolean;
  holdReason?: string | null;
}

// =====================================================================
// RACK & BIN MANAGEMENT
// =====================================================================

export interface RackLocation {
  id: string;
  factoryId: string;
  code: string;
  name: string;
  zone: string;
  totalBins: number;
}

export interface BinLocation {
  id: string;
  rackId: string;
  code: string;
  capacity: number;
  occupied: number;
}

// =====================================================================
// QUALITY: X-OUT, REWORK, INSPECTION
// =====================================================================

export interface XOutBoard {
  id: string;
  boardId: string;
  reasonCode: XOutReasonCode;
  defectLocation: string;
  description: string;
  impactValue: number;
  disposition?: string | null;
  reportedById: string;
  reportedAt: string;
}

export interface ReworkBoard {
  id: string;
  boardId: string;
  reworkStation: string;
  reason: string;
  status: ReworkStatus;
  assignedToId?: string | null;
  startedAt?: string | null;
  completedAt?: string | null;
  notes?: string | null;
}

export interface InspectionPin {
  pinId: string;
  x: number;
  y: number;
  height: number;
  volume: number;
  area: number;
  status: InspectionResult;
  defectType?: DefectType;
}

export interface InspectionRecord {
  id: string;
  boardId: string;
  dmcNumber: string;
  machineId: string;
  result: InspectionResult;
  totalPins: number;
  defectPins: number;
  avgHeight: number;
  avgVolume: number;
  avgArea: number;
  pinData: InspectionPin[];
  timestamp: string;
}

// =====================================================================
// EVENTS, ALERTS, AUDIT
// =====================================================================

export interface ProductionEvent {
  id: string;
  factoryId: string;
  lineId?: string | null;
  lineName?: string | null;
  machineId?: string | null;
  machineName?: string | null;
  boardId?: string | null;
  eventType: string;
  severity: EventSeverity;
  message: string;
  timestamp: string;
}

export interface Alert {
  id: string;
  factoryId: string;
  lineId?: string | null;
  lineName?: string | null;
  machineId?: string | null;
  machineName?: string | null;
  severity: AlertSeverity;
  status: AlertStatus;
  title: string;
  message: string;
  acknowledgedById?: string | null;
  acknowledgedAt?: string | null;
  resolvedById?: string | null;
  resolvedAt?: string | null;
  createdAt: string;
}

export interface AuditLog {
  id: string;
  userId?: string | null;
  factoryId?: string | null;
  action: string;
  entityType: string;
  entityId: string;
  timestamp: string;
}

// =====================================================================
// DASHBOARD / ANALYTICS
// =====================================================================

/** Executive Dashboard top-line KPI tiles */
export interface KPISummary {
  oee: number; // %
  throughput: number; // boards/hour, current
  throughputTarget: number;
  yieldPct: number; // %
  wipCount: number;
  reworkCount: number;
  xOutCount: number;
  productionEfficiency: number; // %
}

/** A single point on a trend chart */
export interface TrendPoint {
  label: string; // e.g. "Mon" or "08:00"
  value: number;
}

export interface KPITrends {
  throughput: TrendPoint[];
  yieldPct: TrendPoint[];
  wip: TrendPoint[];
  utilizationByLine: { line: string; utilization: number }[];
}
