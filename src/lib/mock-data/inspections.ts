import type { InspectionRecord } from "@/lib/types";
import { boards } from "./boards";

function dmcOf(boardId: string): string {
  return boards.find((b) => b.id === boardId)!.dmcNumber;
}

export const inspectionRecords: InspectionRecord[] = [
  {
    id: "insp-0010-spi",
    boardId: "board-0010",
    dmcNumber: dmcOf("board-0010"),
    machineId: "machine-l1-spi",
    result: "PASS",
    totalPins: 4,
    defectPins: 0,
    avgHeight: 121.4,
    avgVolume: 0.182,
    avgArea: 1.92,
    pinData: [
      { pinId: "U12-1", x: 12.4, y: 8.1, height: 120.8, volume: 0.181, area: 1.91, status: "PASS" },
      { pinId: "U12-2", x: 14.0, y: 8.1, height: 121.9, volume: 0.183, area: 1.93, status: "PASS" },
      { pinId: "U15-1", x: 22.6, y: 14.3, height: 122.0, volume: 0.182, area: 1.92, status: "PASS" },
      { pinId: "U15-2", x: 24.2, y: 14.3, height: 121.0, volume: 0.182, area: 1.92, status: "PASS" },
    ],
    timestamp: "2026-06-12T06:05:35+05:30",
  },
  {
    id: "insp-0034-spi",
    boardId: "board-0034",
    dmcNumber: dmcOf("board-0034"),
    machineId: "machine-l3-spi",
    result: "WARNING",
    totalPins: 4,
    defectPins: 1,
    avgHeight: 109.3,
    avgVolume: 0.165,
    avgArea: 1.85,
    pinData: [
      { pinId: "U8-1", x: 10.2, y: 6.4, height: 118.5, volume: 0.179, area: 1.9, status: "PASS" },
      { pinId: "U8-2", x: 11.8, y: 6.4, height: 117.9, volume: 0.178, area: 1.89, status: "PASS" },
      { pinId: "U21-1", x: 30.5, y: 18.2, height: 84.2, volume: 0.123, area: 1.74, status: "WARNING", defectType: "INSUFFICIENT" },
      { pinId: "U21-2", x: 32.1, y: 18.2, height: 116.6, volume: 0.18, area: 1.88, status: "PASS" },
    ],
    timestamp: "2026-06-12T08:58:40+05:30",
  },
  {
    id: "insp-0037-aoi",
    boardId: "board-0037",
    dmcNumber: dmcOf("board-0037"),
    machineId: "machine-l1-aoi",
    result: "FAIL",
    totalPins: 4,
    defectPins: 2,
    avgHeight: 134.8,
    avgVolume: 0.201,
    avgArea: 2.05,
    pinData: [
      { pinId: "U3-1", x: 8.1, y: 4.2, height: 121.2, volume: 0.182, area: 1.92, status: "PASS" },
      { pinId: "U3-2", x: 9.7, y: 4.2, height: 178.4, volume: 0.268, area: 2.31, status: "FAIL", defectType: "BRIDGING" },
      { pinId: "U7-1", x: 18.0, y: 11.6, height: 121.0, volume: 0.181, area: 1.91, status: "PASS" },
      { pinId: "U7-2", x: 19.6, y: 11.6, height: 118.6, volume: 0.19, area: 2.06, status: "FAIL", defectType: "BRIDGING" },
    ],
    timestamp: "2026-06-11T17:08:12+05:30",
  },
];
