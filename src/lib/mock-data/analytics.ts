import type { TrendPoint } from "@/lib/types";

const DAYS = ["Wed", "Thu", "Fri", "Sat", "Sun", "Mon", "Tue"];

export const oeeTrend: TrendPoint[] = DAYS.map((label, i) => ({
  label,
  value: [78.5, 81.2, 79.8, 75.0, 77.4, 86.1, 84.2][i],
}));

export const downtimeByReason: { reason: string; minutes: number }[] = [
  { reason: "Changeover", minutes: 145 },
  { reason: "Equipment Fault", minutes: 210 },
  { reason: "Material Shortage", minutes: 95 },
  { reason: "Preventive Maint.", minutes: 90 },
  { reason: "Quality Hold", minutes: 130 },
];

export const factoryPerformance = {
  availability: 92.1,
  performance: 91.4,
  quality: 97.4,
  oee: 84.2,
};
