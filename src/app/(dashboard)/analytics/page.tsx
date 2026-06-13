import { CheckCircle2, Gauge, PlayCircle, Timer } from "lucide-react";
import { KPITile } from "@/components/dashboard/kpi-tile";
import { ThroughputChart } from "@/components/dashboard/throughput-chart";
import { YieldChart } from "@/components/dashboard/yield-chart";
import { OEETrendChart } from "@/components/dashboard/oee-trend-chart";
import { DowntimeChart } from "@/components/dashboard/downtime-chart";
import { factoryPerformance } from "@/lib/mock-data";

export default function AnalyticsPage() {
  return (
    <div className="flex flex-col gap-6 p-4 lg:p-6">
      <div>
        <h1 className="text-xl font-semibold tracking-tight text-foreground">Production Analytics</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Throughput, yield, OEE, and downtime trends for shift reviews and management reporting.
        </p>
      </div>

      <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
        <KPITile label="Availability" value={factoryPerformance.availability} unit="%" decimals={1} subtext="Run time vs. planned time" icon={PlayCircle} tone="running" />
        <KPITile label="Performance" value={factoryPerformance.performance} unit="%" decimals={1} subtext="Actual vs. ideal cycle time" icon={Timer} tone="completed" />
        <KPITile label="Quality" value={factoryPerformance.quality} unit="%" decimals={1} subtext="First-pass yield" icon={CheckCircle2} tone="running" />
        <KPITile label="OEE" value={factoryPerformance.oee} unit="%" decimals={1} subtext="Availability × Performance × Quality" icon={Gauge} tone="warning" />
      </div>

      <div className="grid grid-cols-1 gap-4 xl:grid-cols-2">
        <ThroughputChart />
        <YieldChart />
        <OEETrendChart />
        <DowntimeChart />
      </div>
    </div>
  );
}
