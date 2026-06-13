"use client";

import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { CHART_COLORS } from "@/lib/design-tokens";
import { ChartCard } from "@/components/dashboard/chart-card";
import { ChartTooltip } from "@/components/dashboard/chart-tooltip";

interface ReasonCount {
  reason: string;
  count: number;
}

export function XOutReasonChart({ data }: { data: ReasonCount[] }) {
  return (
    <ChartCard title="X-Out by Reason Code" description="Flagged boards, current batch">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} margin={{ top: 4, right: 8, left: 0, bottom: 0 }}>
          <CartesianGrid stroke="var(--border)" strokeDasharray="3 3" vertical={false} />
          <XAxis dataKey="reason" stroke="var(--muted-foreground)" fontSize={11} tickLine={false} axisLine={false} />
          <YAxis stroke="var(--muted-foreground)" fontSize={12} tickLine={false} axisLine={false} width={32} allowDecimals={false} />
          <Tooltip content={<ChartTooltip valueLabel="Boards" />} />
          <Bar dataKey="count" fill={CHART_COLORS.rework} radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </ChartCard>
  );
}
