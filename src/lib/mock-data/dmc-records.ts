import type { DMCRecord } from "@/lib/types";
import { boards } from "./boards";

function dmcOf(boardId: string): string {
  return boards.find((b) => b.id === boardId)!.dmcNumber;
}

export const dmcRecords: DMCRecord[] = [
  // board-0010 — SMT Line 01, IN_PROGRESS, currently at Placement-01
  { id: "dmc-0010-01", boardId: "board-0010", dmcNumber: dmcOf("board-0010"), lineId: "line-smt-01", machineId: "machine-l1-printer", stationCode: "PRINT-01", eventType: "PANEL_LOADED", operatorId: "user-op-01", operatorName: "R. Kumar", timestamp: "2026-06-12T06:05:10+05:30" },
  { id: "dmc-0010-02", boardId: "board-0010", dmcNumber: dmcOf("board-0010"), lineId: "line-smt-01", machineId: "machine-l1-printer", stationCode: "PRINT-01", eventType: "STATION_ENTRY", timestamp: "2026-06-12T06:05:12+05:30" },
  { id: "dmc-0010-03", boardId: "board-0010", dmcNumber: dmcOf("board-0010"), lineId: "line-smt-01", machineId: "machine-l1-printer", stationCode: "PRINT-01", eventType: "STATION_EXIT", timestamp: "2026-06-12T06:05:20+05:30" },
  { id: "dmc-0010-04", boardId: "board-0010", dmcNumber: dmcOf("board-0010"), lineId: "line-smt-01", machineId: "machine-l1-spi", stationCode: "SPI-01", eventType: "STATION_ENTRY", timestamp: "2026-06-12T06:05:28+05:30" },
  { id: "dmc-0010-05", boardId: "board-0010", dmcNumber: dmcOf("board-0010"), lineId: "line-smt-01", machineId: "machine-l1-spi", stationCode: "SPI-01", eventType: "INSPECTION", notes: "SPI pass — avg paste height 121.4µm", timestamp: "2026-06-12T06:05:35+05:30" },
  { id: "dmc-0010-06", boardId: "board-0010", dmcNumber: dmcOf("board-0010"), lineId: "line-smt-01", machineId: "machine-l1-spi", stationCode: "SPI-01", eventType: "STATION_EXIT", timestamp: "2026-06-12T06:05:40+05:30" },
  { id: "dmc-0010-07", boardId: "board-0010", dmcNumber: dmcOf("board-0010"), lineId: "line-smt-01", machineId: "machine-l1-placement", stationCode: "PLACE-01", eventType: "STATION_ENTRY", operatorId: "user-op-01", operatorName: "R. Kumar", timestamp: "2026-06-12T06:05:50+05:30" },

  // board-0034 — SMT Line 03, HOLD at Placement-03
  { id: "dmc-0034-01", boardId: "board-0034", dmcNumber: dmcOf("board-0034"), lineId: "line-smt-03", machineId: "machine-l3-printer", stationCode: "PRINT-03", eventType: "PANEL_LOADED", operatorId: "user-op-03", operatorName: "S. Iyer", timestamp: "2026-06-12T08:50:05+05:30" },
  { id: "dmc-0034-02", boardId: "board-0034", dmcNumber: dmcOf("board-0034"), lineId: "line-smt-03", machineId: "machine-l3-printer", stationCode: "PRINT-03", eventType: "STATION_ENTRY", timestamp: "2026-06-12T08:50:08+05:30" },
  { id: "dmc-0034-03", boardId: "board-0034", dmcNumber: dmcOf("board-0034"), lineId: "line-smt-03", machineId: "machine-l3-printer", stationCode: "PRINT-03", eventType: "STATION_EXIT", timestamp: "2026-06-12T08:50:18+05:30" },
  { id: "dmc-0034-04", boardId: "board-0034", dmcNumber: dmcOf("board-0034"), lineId: "line-smt-03", machineId: "machine-l3-spi", stationCode: "SPI-03", eventType: "STATION_ENTRY", timestamp: "2026-06-12T08:50:25+05:30" },
  { id: "dmc-0034-05", boardId: "board-0034", dmcNumber: dmcOf("board-0034"), lineId: "line-smt-03", machineId: "machine-l3-spi", stationCode: "SPI-03", eventType: "INSPECTION", notes: "SPI warning — U21 pin 1 insufficient paste (84.2µm)", timestamp: "2026-06-12T08:58:40+05:30" },
  { id: "dmc-0034-06", boardId: "board-0034", dmcNumber: dmcOf("board-0034"), lineId: "line-smt-03", machineId: "machine-l3-spi", stationCode: "SPI-03", eventType: "STATION_EXIT", timestamp: "2026-06-12T08:59:00+05:30" },
  { id: "dmc-0034-07", boardId: "board-0034", dmcNumber: dmcOf("board-0034"), lineId: "line-smt-03", machineId: "machine-l3-placement", stationCode: "PLACE-03", eventType: "STATION_ENTRY", operatorId: "user-op-03", operatorName: "S. Iyer", timestamp: "2026-06-12T08:59:10+05:30" },
  { id: "dmc-0034-08", boardId: "board-0034", dmcNumber: dmcOf("board-0034"), lineId: "line-smt-03", machineId: "machine-l3-placement", stationCode: "PLACE-03", eventType: "HOLD_APPLIED", notes: "Line on HOLD — AOI-03 recalibration in progress", timestamp: "2026-06-12T09:20:00+05:30" },

  // board-0037 — SMT Line 01, batch 2026-06-11, XOUT flagged at AOI-01
  { id: "dmc-0037-01", boardId: "board-0037", dmcNumber: dmcOf("board-0037"), lineId: "line-smt-01", machineId: "machine-l1-printer", stationCode: "PRINT-01", eventType: "PANEL_LOADED", operatorId: "user-op-01", operatorName: "R. Kumar", timestamp: "2026-06-11T06:10:00+05:30" },
  { id: "dmc-0037-02", boardId: "board-0037", dmcNumber: dmcOf("board-0037"), lineId: "line-smt-01", machineId: "machine-l1-printer", stationCode: "PRINT-01", eventType: "STATION_EXIT", timestamp: "2026-06-11T06:10:18+05:30" },
  { id: "dmc-0037-03", boardId: "board-0037", dmcNumber: dmcOf("board-0037"), lineId: "line-smt-01", machineId: "machine-l1-spi", stationCode: "SPI-01", eventType: "INSPECTION", notes: "SPI pass", timestamp: "2026-06-11T06:10:35+05:30" },
  { id: "dmc-0037-04", boardId: "board-0037", dmcNumber: dmcOf("board-0037"), lineId: "line-smt-01", machineId: "machine-l1-spi", stationCode: "SPI-01", eventType: "STATION_EXIT", timestamp: "2026-06-11T06:10:42+05:30" },
  { id: "dmc-0037-05", boardId: "board-0037", dmcNumber: dmcOf("board-0037"), lineId: "line-smt-01", machineId: "machine-l1-placement", stationCode: "PLACE-01", eventType: "STATION_EXIT", timestamp: "2026-06-11T06:11:10+05:30" },
  { id: "dmc-0037-06", boardId: "board-0037", dmcNumber: dmcOf("board-0037"), lineId: "line-smt-01", machineId: "machine-l1-reflow", stationCode: "REFLOW-01", eventType: "STATION_EXIT", timestamp: "2026-06-11T06:12:30+05:30" },
  { id: "dmc-0037-07", boardId: "board-0037", dmcNumber: dmcOf("board-0037"), lineId: "line-smt-01", machineId: "machine-l1-aoi", stationCode: "AOI-01", eventType: "INSPECTION", notes: "AOI fail — solder bridging on U3/U7", timestamp: "2026-06-11T17:08:12+05:30" },
  { id: "dmc-0037-08", boardId: "board-0037", dmcNumber: dmcOf("board-0037"), lineId: "line-smt-01", machineId: "machine-l1-aoi", stationCode: "AOI-01", eventType: "XOUT_FLAGGED", notes: "Flagged for X-Out — SOLDER_DEFECT", operatorId: "user-quality-01", operatorName: "A. Nair", timestamp: "2026-06-11T17:10:00+05:30" },
];
