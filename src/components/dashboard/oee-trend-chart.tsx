"use client";

import { CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { oeeTrend } from "@/lib/mock-data";
import { CHART_COLORS } from "@/lib/design-tokens";
import { ChartCard } from "@/components/dashboard/chart-card";
import { ChartTooltip } from "@/components/dashboard/chart-tooltip";

export function OEETrendChart() {
  return (
    <ChartCard title="OEE Trend" description="Overall Equipment Effectiveness, last 7 days">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={oeeTrend} margin={{ top: 4, right: 8, left: -16, bottom: 0 }}>
          <CartesianGrid stroke="var(--border)" strokeDasharray="3 3" vertical={false} />
          <XAxis dataKey="label" stroke="var(--muted-foreground)" fontSize={12} tickLine={false} axisLine={false} />
          <YAxis
            stroke="var(--muted-foreground)"
            fontSize={12}
            tickLine={false}
            axisLine={false}
            width={48}
            domain={[70, 90]}
          />
          <Tooltip content={<ChartTooltip valueLabel="OEE" unit="%" />} />
          <Line
            type="monotone"
            dataKey="value"
            stroke={CHART_COLORS.utilization}
            strokeWidth={2}
            dot={{ r: 3, fill: CHART_COLORS.utilization, strokeWidth: 0 }}
            activeDot={{ r: 5 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </ChartCard>
  );
}
