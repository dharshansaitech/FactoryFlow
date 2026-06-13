import type { WIPRecord } from "@/lib/types";

export const wipRecords: WIPRecord[] = [
  { id: "wip-0010", boardId: "board-0010", lineId: "line-smt-01", currentStation: "Placement-01", enteredStationAt: "2026-06-12T09:35:00+05:30", agingMinutes: 7, isBottleneck: false, isOnHold: false },
  { id: "wip-0011", boardId: "board-0011", lineId: "line-smt-01", currentStation: "Placement-01", enteredStationAt: "2026-06-12T09:33:00+05:30", agingMinutes: 9, isBottleneck: false, isOnHold: false },
  { id: "wip-0012", boardId: "board-0012", lineId: "line-smt-01", currentStation: "Placement-01", enteredStationAt: "2026-06-12T09:30:00+05:30", agingMinutes: 12, isBottleneck: false, isOnHold: false },
  { id: "wip-0017", boardId: "board-0017", lineId: "line-smt-02", currentStation: "SPI-02", enteredStationAt: "2026-06-12T09:18:00+05:30", agingMinutes: 24, isBottleneck: true, isOnHold: false },
  { id: "wip-0018", boardId: "board-0018", lineId: "line-smt-02", currentStation: "SPI-02", enteredStationAt: "2026-06-12T09:20:00+05:30", agingMinutes: 22, isBottleneck: true, isOnHold: false },
  { id: "wip-0019", boardId: "board-0019", lineId: "line-smt-02", currentStation: "SPI-02", enteredStationAt: "2026-06-12T09:25:00+05:30", agingMinutes: 17, isBottleneck: false, isOnHold: false },
  { id: "wip-0027", boardId: "board-0027", lineId: "line-smt-02", currentStation: "Placement-02", enteredStationAt: "2026-06-12T09:15:00+05:30", agingMinutes: 27, isBottleneck: false, isOnHold: true, holdReason: "Component shortage — U22 0201 capacitor" },
  { id: "wip-0028", boardId: "board-0028", lineId: "line-smt-02", currentStation: "Placement-02", enteredStationAt: "2026-06-12T09:15:00+05:30", agingMinutes: 27, isBottleneck: false, isOnHold: true, holdReason: "Component shortage — U22 0201 capacitor" },
  { id: "wip-0029", boardId: "board-0029", lineId: "line-smt-02", currentStation: "SPI-02", enteredStationAt: "2026-06-12T09:36:00+05:30", agingMinutes: 6, isBottleneck: false, isOnHold: false },
  { id: "wip-0030", boardId: "board-0030", lineId: "line-smt-03", currentStation: "SPI-03", enteredStationAt: "2026-06-12T09:30:00+05:30", agingMinutes: 12, isBottleneck: false, isOnHold: false },
  { id: "wip-0031", boardId: "board-0031", lineId: "line-smt-03", currentStation: "SPI-03", enteredStationAt: "2026-06-12T09:28:00+05:30", agingMinutes: 14, isBottleneck: false, isOnHold: false },
  { id: "wip-0034", boardId: "board-0034", lineId: "line-smt-03", currentStation: "Placement-03", enteredStationAt: "2026-06-12T08:25:00+05:30", agingMinutes: 77, isBottleneck: true, isOnHold: true, holdReason: "AOI-03 recalibration — line on HOLD" },
  { id: "wip-0035", boardId: "board-0035", lineId: "line-smt-03", currentStation: "Placement-03", enteredStationAt: "2026-06-12T08:27:00+05:30", agingMinutes: 75, isBottleneck: true, isOnHold: true, holdReason: "AOI-03 recalibration — line on HOLD" },
  { id: "wip-0036", boardId: "board-0036", lineId: "line-smt-03", currentStation: "Placement-03", enteredStationAt: "2026-06-12T08:30:00+05:30", agingMinutes: 72, isBottleneck: true, isOnHold: true, holdReason: "AOI-03 recalibration — line on HOLD" },
];
