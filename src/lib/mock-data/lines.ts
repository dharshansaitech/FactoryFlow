import type { ProductionLine } from "@/lib/types";
import { currentFactory } from "./factories";

export const productionLines: ProductionLine[] = [
  {
    id: "line-smt-01",
    factoryId: currentFactory.id,
    name: "SMT Line 01",
    code: "SMT-L01",
    status: "RUNNING",
    targetThroughput: 450,
    currentThroughput: 432,
    activeWorkOrderId: "wo-2026-1001",
    oee: 91.2,
    yieldPct: 98.6,
    updatedAt: "2026-06-12T09:42:00+05:30",
  },
  {
    id: "line-smt-02",
    factoryId: currentFactory.id,
    name: "SMT Line 02",
    code: "SMT-L02",
    status: "RUNNING",
    targetThroughput: 420,
    currentThroughput: 365,
    activeWorkOrderId: "wo-2026-1003",
    oee: 82.3,
    yieldPct: 96.1,
    updatedAt: "2026-06-12T09:42:00+05:30",
  },
  {
    id: "line-smt-03",
    factoryId: currentFactory.id,
    name: "SMT Line 03",
    code: "SMT-L03",
    status: "HOLD",
    targetThroughput: 400,
    currentThroughput: 0,
    activeWorkOrderId: "wo-2026-1005",
    oee: 38.4,
    yieldPct: 94.8,
    updatedAt: "2026-06-12T09:40:00+05:30",
  },
];
