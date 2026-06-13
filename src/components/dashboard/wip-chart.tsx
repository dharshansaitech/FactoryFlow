"use client";

import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { kpiTrends } from "@/lib/mock-data";
import { CHART_COLORS } from "@/lib/design-tokens";
import { ChartCard } from "@/components/dashboard/chart-card";
import { ChartTooltip } from "@/components/dashboard/chart-tooltip";

export function WIPChart() {
  return (
    <ChartCard title="WIP Trend" description="Boards in process, last 7 days">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={kpiTrends.wip} margin={{ top: 4, right: 8, left: -16, bottom: 0 }}>
          <CartesianGrid stroke="var(--border)" strokeDasharray="3 3" vertical={false} />
          <XAxis dataKey="label" stroke="var(--muted-foreground)" fontSize={12} tickLine={false} axisLine={false} />
          <YAxis stroke="var(--muted-foreground)" fontSize={12} tickLine={false} axisLine={false} width={48} />
          <Tooltip content={<ChartTooltip valueLabel="WIP" unit=" boards" />} />
          <Bar dataKey="value" fill={CHART_COLORS.wip} radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </ChartCard>
  );
}
