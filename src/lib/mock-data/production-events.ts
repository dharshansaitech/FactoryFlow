import type { EventSeverity, ProductionEvent } from "@/lib/types";
import { currentFactory } from "./factories";

type EventSpec = [
  time: string,
  lineId: string | null,
  lineName: string | null,
  machineId: string | null,
  machineName: string | null,
  eventType: string,
  severity: EventSeverity,
  message: string,
];

const specs: EventSpec[] = [
  ["06:00:00", "line-smt-01", "SMT Line 01", null, null, "LINE_START", "INFO", "SMT Line 01 started — WO-2026-1001 (ECU Control Board Rev C)."],
  ["06:00:15", "line-smt-02", "SMT Line 02", null, null, "LINE_START", "INFO", "SMT Line 02 started — WO-2026-1003 (BMS Power Module Rev B)."],
  ["06:00:30", "line-smt-03", "SMT Line 03", null, null, "LINE_START", "INFO", "SMT Line 03 started — WO-2026-1005 (ABS Wheel Speed Sensor PCB Rev D)."],
  ["06:02:10", "line-smt-01", "SMT Line 01", "machine-l1-printer", "Printer-01", "MACHINE_START", "INFO", "Printer-01 online, stencil PN-45821-C loaded."],
  ["06:02:45", "line-smt-02", "SMT Line 02", "machine-l2-printer", "Printer-02", "MACHINE_START", "INFO", "Printer-02 online, stencil PN-38110-B loaded."],
  ["06:03:20", "line-smt-03", "SMT Line 03", "machine-l3-printer", "Printer-03", "MACHINE_START", "INFO", "Printer-03 online, stencil PN-29044-D loaded."],
  ["06:18:40", "line-smt-01", "SMT Line 01", "machine-l1-spi", "SPI-01", "INSPECTION", "INFO", "First-article SPI pass — DMC 4026206110001001, 0 defect pins / 312."],
  ["06:42:05", "line-smt-02", "SMT Line 02", "machine-l2-spi", "SPI-02", "INSPECTION", "INFO", "First-article SPI pass — DMC 4026206120002001, 1 defect pin / 298."],
  ["07:05:30", "line-smt-01", "SMT Line 01", "machine-l1-aoi", "AOI-01", "BOARD_COMPLETED", "INFO", "Board DMC 4026206110001003 completed AOI — PASS."],
  ["07:12:15", "line-smt-01", "SMT Line 01", "machine-l1-aoi", "AOI-01", "BOARD_COMPLETED", "INFO", "Board DMC 4026206110001004 completed AOI — PASS."],
  ["07:18:00", "line-smt-02", "SMT Line 02", "machine-l2-aoi", "AOI-02", "BOARD_COMPLETED", "INFO", "Board DMC 4026206120002003 completed AOI — PASS."],
  ["07:25:50", null, null, null, null, "RACK_UPDATE", "INFO", "Rack A1 occupancy reached 85% (34 / 40 bins)."],
  ["07:40:00", "line-smt-03", "SMT Line 03", "machine-l3-aoi", "AOI-03", "MACHINE_WARNING", "WARNING", "AOI-03 false call rate trending up — 4.1% over last 20 boards."],
  ["07:55:20", "line-smt-02", "SMT Line 02", "machine-l2-spi", "SPI-02", "MACHINE_WARNING", "WARNING", "SPI-02 average paste height drifting toward upper control limit."],
  ["08:05:10", "line-smt-01", "SMT Line 01", "machine-l1-placement", "Placement-01", "BOARD_COMPLETED", "INFO", "Board DMC 4026206110001006 placement complete — 184 components."],
  ["08:15:00", "line-smt-03", "SMT Line 03", "machine-l3-reflow", "Reflow-03", "MACHINE_OFFLINE", "WARNING", "Reflow-03 taken offline for scheduled preventive maintenance."],
  ["08:30:00", "line-smt-03", "SMT Line 03", "machine-l3-reflow", "Reflow-03", "ALERT_ACK", "INFO", "PM alert for Reflow-03 acknowledged by Supervisor."],
  ["08:42:30", "line-smt-02", "SMT Line 02", "machine-l2-placement", "Placement-02", "BOARD_COMPLETED", "INFO", "Board DMC 4026206120002005 placement complete — 211 components."],
  ["08:50:45", "line-smt-02", "SMT Line 02", null, "QE Station", "REWORK_QUEUED", "WARNING", "Board DMC 4026206120002011 queued for rework — tombstone defect at C44."],
  ["08:52:10", "line-smt-02", "SMT Line 02", null, "QE Station", "REWORK_QUEUED", "WARNING", "Board DMC 4026206120002012 queued for rework — insufficient solder at U8."],
  ["09:00:00", "line-smt-01", "SMT Line 01", "machine-l1-aoi", "AOI-01", "BOARD_COMPLETED", "INFO", "Board DMC 4026206110001009 completed AOI — PASS. WO-2026-1001 at 1,000 / 2,000."],
  ["09:05:00", "line-smt-02", "SMT Line 02", "machine-l2-spi", "SPI-02", "ALERT_RAISED", "WARNING", "Solder paste height drift alert raised for SPI-02."],
  ["09:10:00", null, null, null, null, "ALERT_RAISED", "WARNING", "Rack A1 capacity alert raised — 92% occupancy."],
  ["09:18:00", "line-smt-03", "SMT Line 03", "machine-l3-aoi", "AOI-03", "MACHINE_CRITICAL", "CRITICAL", "AOI-03 camera calibration fault — false call rate 12.8%. Inspection halted."],
  ["09:20:00", "line-smt-03", "SMT Line 03", null, null, "LINE_HOLD", "CRITICAL", "SMT Line 03 placed on HOLD pending AOI-03 recalibration."],
  ["09:22:30", "line-smt-03", "SMT Line 03", "machine-l3-placement", "Placement-03", "MACHINE_HOLD", "WARNING", "Placement-03 paused — 3 boards held in queue."],
  ["09:25:00", "line-smt-03", "SMT Line 03", null, null, "ALERT_RAISED", "WARNING", "WIP aging alert raised — boards at Placement-03 exceed 60 min."],
  ["09:32:40", "line-smt-01", "SMT Line 01", "machine-l1-aoi", "AOI-01", "BOARD_COMPLETED", "INFO", "Board DMC 4026206110001011 completed AOI — PASS."],
  ["09:38:15", "line-smt-02", "SMT Line 02", "machine-l2-aoi", "AOI-02", "BOARD_COMPLETED", "INFO", "Board DMC 4026206120002007 completed AOI — PASS."],
  ["09:42:00", "line-smt-01", "SMT Line 01", "machine-l1-printer", "Printer-01", "BOARD_COMPLETED", "INFO", "Board DMC 4026206110001012 entered Printer-01 — WO-2026-1001 in progress."],
];

export const productionEvents: ProductionEvent[] = specs
  .map((s, idx) => ({
    id: `event-${(idx + 1).toString().padStart(4, "0")}`,
    factoryId: currentFactory.id,
    lineId: s[1],
    lineName: s[2],
    machineId: s[3],
    machineName: s[4],
    boardId: null,
    eventType: s[5],
    severity: s[6],
    message: s[7],
    timestamp: `2026-06-12T${s[0]}+05:30`,
  }))
  .reverse(); // most recent first
