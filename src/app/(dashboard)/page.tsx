import { currentFactory } from "@/lib/mock-data";
import { KPIRow } from "@/components/dashboard/kpi-row";
import { LineStatusStrip } from "@/components/dashboard/line-status-strip";
import { ThroughputChart } from "@/components/dashboard/throughput-chart";
import { YieldChart } from "@/components/dashboard/yield-chart";
import { WIPChart } from "@/components/dashboard/wip-chart";
import { UtilizationChart } from "@/components/dashboard/utilization-chart";

export default function ExecutiveDashboardPage() {
  return (
    <div className="flex flex-col gap-6 p-4 lg:p-6">
      <div>
        <h1 className="text-xl font-semibold tracking-tight text-foreground">Executive Dashboard</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          {currentFactory.name} — {currentFactory.location} · Plant-wide OEE, throughput, yield, and efficiency.
        </p>
      </div>

      <KPIRow />

      <LineStatusStrip />

      <div className="grid grid-cols-1 gap-4 xl:grid-cols-2">
        <ThroughputChart />
        <YieldChart />
        <WIPChart />
        <UtilizationChart />
      </div>
    </div>
  );
}
