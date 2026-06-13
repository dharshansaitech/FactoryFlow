import type { XOutBoard } from "@/lib/types";

export const xOutBoards: XOutBoard[] = [
  {
    id: "xout-0037",
    boardId: "board-0037",
    reasonCode: "SOLDER_DEFECT",
    defectLocation: "U3 pin 2, U7 pin 2",
    description: "AOI flagged solder bridging on U3 and U7 after reflow.",
    impactValue: 1,
    disposition: "SCRAP",
    reportedById: "user-quality-01",
    reportedAt: "2026-06-11T17:10:00+05:30",
  },
  {
    id: "xout-0038",
    boardId: "board-0038",
    reasonCode: "COMPONENT_DEFECT",
    defectLocation: "U18 — 0402 resistor",
    description: "Component tombstoned at AOI; resistor lifted during reflow.",
    impactValue: 1,
    disposition: "REWORK",
    reportedById: "user-quality-01",
    reportedAt: "2026-06-11T17:22:00+05:30",
  },
];
