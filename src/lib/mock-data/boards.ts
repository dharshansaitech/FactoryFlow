import type { Board, BoardStatus } from "@/lib/types";

/** Zero-pad a sequence number into a 16-digit numeric DMC code. */
function dmc(lineDigit: number, seq: number): string {
  return `40262061${lineDigit}0000${seq.toString().padStart(4, "0")}`;
}

interface BoardSpec {
  seq: number;
  status: BoardStatus;
  workOrderId: string;
  partNumber: string;
  lineDigit: number;
  batchNumber: string;
  currentLineId?: string | null;
  currentMachineId?: string | null;
  currentBinId?: string | null;
  createdAt: string;
  updatedAt: string;
}

const T0 = "2026-06-12T06:00:00+05:30";
const T_LATEST = "2026-06-12T09:42:00+05:30";

const specs: BoardSpec[] = [];

// SMT Line 01 — WO-2026-1001, ECU Control Board Rev C (mostly IN_PROGRESS / COMPLETED)
for (let i = 1; i <= 16; i++) {
  specs.push({
    seq: i,
    status: i <= 9 ? "COMPLETED" : "IN_PROGRESS",
    workOrderId: "wo-2026-1001",
    partNumber: "PN-45821-C",
    lineDigit: 1,
    batchNumber: "BATCH-2026-06-12-A",
    currentLineId: "line-smt-01",
    currentMachineId: i <= 9 ? null : "machine-l1-placement",
    createdAt: T0,
    updatedAt: T_LATEST,
  });
}

// SMT Line 02 — WO-2026-1003, BMS Power Module Rev B (IN_PROGRESS + a couple REWORK)
for (let i = 1; i <= 13; i++) {
  let status: BoardStatus = "IN_PROGRESS";
  if (i === 11 || i === 12) status = "REWORK";
  if (i === 13) status = "HOLD";
  specs.push({
    seq: i,
    status,
    workOrderId: "wo-2026-1003",
    partNumber: "PN-38110-B",
    lineDigit: 2,
    batchNumber: "BATCH-2026-06-12-B",
    currentLineId: "line-smt-02",
    currentMachineId: status === "IN_PROGRESS" ? "machine-l2-spi" : null,
    createdAt: T0,
    updatedAt: T_LATEST,
  });
}

// SMT Line 03 — WO-2026-1005, ABS Wheel Speed Sensor PCB Rev D (HOLD line — boards stuck)
for (let i = 1; i <= 7; i++) {
  let status: BoardStatus = "HOLD";
  if (i <= 4) status = "IN_PROGRESS";
  specs.push({
    seq: i,
    status,
    workOrderId: "wo-2026-1005",
    partNumber: "PN-29044-D",
    lineDigit: 3,
    batchNumber: "BATCH-2026-06-12-C",
    currentLineId: "line-smt-03",
    currentMachineId: status === "HOLD" ? "machine-l3-placement" : "machine-l3-spi",
    createdAt: T0,
    updatedAt: T_LATEST,
  });
}

// X-Out and shipped boards from yesterday's completed run (WO-2026-0998)
for (let i = 1; i <= 4; i++) {
  const status: BoardStatus = i <= 2 ? "XOUT" : "SHIPPED";
  specs.push({
    seq: i,
    status,
    workOrderId: "wo-2026-0998",
    partNumber: "PN-45821-C",
    lineDigit: 1,
    batchNumber: "BATCH-2026-06-11-A",
    currentLineId: null,
    currentMachineId: null,
    currentBinId: status === "SHIPPED" ? null : "bin-a1-03",
    createdAt: "2026-06-11T06:00:00+05:30",
    updatedAt: "2026-06-11T17:30:00+05:30",
  });
}

export const boards: Board[] = specs.map((s, idx) => ({
  id: `board-${(idx + 1).toString().padStart(4, "0")}`,
  dmcNumber: dmc(s.lineDigit, s.seq + s.lineDigit * 1000),
  serialNumber: `SN-2026-${(idx + 1).toString().padStart(6, "0")}`,
  batchNumber: s.batchNumber,
  partNumber: s.partNumber,
  revision: s.partNumber.split("-").pop() ?? "A",
  workOrderId: s.workOrderId,
  status: s.status,
  currentLineId: s.currentLineId ?? null,
  currentMachineId: s.currentMachineId ?? null,
  currentBinId: s.currentBinId ?? null,
  createdAt: s.createdAt,
  updatedAt: s.updatedAt,
}));
