import type { KPISummary, KPITrends } from "@/lib/types";
import { productionLines } from "./lines";

export const kpiSummary: KPISummary = {
  oee: 84.2,
  throughput: productionLines.reduce((sum, l) => sum + l.currentThroughput, 0), // 797
  throughputTarget: productionLines.reduce((sum, l) => sum + l.targetThroughput, 0), // 1270
  yieldPct: 97.4,
  wipCount: 25,
  reworkCount: 2,
  xOutCount: 2,
  productionEfficiency: 88.7,
};

const DAYS = ["Wed", "Thu", "Fri", "Sat", "Sun", "Mon", "Tue"];

export const kpiTrends: KPITrends = {
  throughput: DAYS.map((label, i) => ({
    label,
    value: [1180, 1205, 1150, 980, 1020, 1240, 797][i],
  })),
  yieldPct: DAYS.map((label, i) => ({
    label,
    value: [96.8, 97.1, 96.5, 95.9, 96.2, 97.8, 97.4][i],
  })),
  wip: DAYS.map((label, i) => ({
    label,
    value: [22, 19, 28, 31, 27, 18, 25][i],
  })),
  utilizationByLine: productionLines.map((l) => ({
    line: l.name,
    utilization: l.oee,
  })),
};
