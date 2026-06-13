import { Activity, CheckCircle2, Gauge, Layers3, TrendingUp, Wrench, XCircle } from "lucide-react";
import { kpiSummary } from "@/lib/mock-data";
import { KPITile } from "@/components/dashboard/kpi-tile";

export function KPIRow() {
  return (
    <div className="grid grid-cols-2 gap-3 md:grid-cols-4 xl:grid-cols-7">
      <KPITile
        label="OEE"
        value={kpiSummary.oee}
        unit="%"
        decimals={1}
        subtext="Overall Equipment Effectiveness"
        icon={Gauge}
        tone="running"
      />
      <KPITile
        label="Throughput"
        value={kpiSummary.throughput}
        unit={`/ ${kpiSummary.throughputTarget} b/hr`}
        subtext="Boards per hour, plant-wide"
        icon={Activity}
        tone="completed"
      />
      <KPITile
        label="Yield"
        value={kpiSummary.yieldPct}
        unit="%"
        decimals={1}
        subtext="First-pass yield, current shift"
        icon={CheckCircle2}
        tone="running"
      />
      <KPITile
        label="WIP"
        value={kpiSummary.wipCount}
        unit="boards"
        subtext="In-process across all lines"
        icon={Layers3}
        tone="warning"
      />
      <KPITile
        label="Rework"
        value={kpiSummary.reworkCount}
        unit="boards"
        subtext="Queued or in rework"
        icon={Wrench}
        tone="hold"
      />
      <KPITile
        label="X-Out"
        value={kpiSummary.xOutCount}
        unit="boards"
        subtext="Flagged for scrap/disposition"
        icon={XCircle}
        tone="critical"
      />
      <KPITile
        label="Efficiency"
        value={kpiSummary.productionEfficiency}
        unit="%"
        decimals={1}
        subtext="Production efficiency vs. target"
        icon={TrendingUp}
        tone="completed"
      />
    </div>
  );
}
