import { Card } from "@/components/ui/card";
import { StatusBadge } from "@/components/layout/status-badge";
import { lineStatusToStatusKey } from "@/lib/design-tokens";
import { productionLines, workOrders } from "@/lib/mock-data";

export function LineStatusStrip() {
  return (
    <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
      {productionLines.map((line) => {
        const activeOrder = workOrders.find((wo) => wo.id === line.activeWorkOrderId);
        const progressPct = activeOrder
          ? Math.round((activeOrder.quantityCompleted / activeOrder.quantityPlanned) * 100)
          : 0;

        return (
          <Card key={line.id} className="px-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-foreground">{line.name}</p>
                <p className="text-xs text-muted-foreground">{line.code}</p>
              </div>
              <StatusBadge status={lineStatusToStatusKey(line.status)} glow />
            </div>
            <div className="mt-3 grid grid-cols-2 gap-3 text-xs">
              <div>
                <p className="text-muted-foreground">Throughput</p>
                <p className="mt-0.5 font-data text-sm tabular-nums text-foreground">
                  {line.currentThroughput} / {line.targetThroughput} b/hr
                </p>
              </div>
              <div>
                <p className="text-muted-foreground">OEE</p>
                <p className="mt-0.5 font-data text-sm tabular-nums text-foreground">{line.oee.toFixed(1)}%</p>
              </div>
            </div>
            {activeOrder && (
              <div className="mt-3">
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <span className="truncate">{activeOrder.orderNumber} — {activeOrder.productName}</span>
                  <span className="font-data tabular-nums">{progressPct}%</span>
                </div>
                <div className="mt-1.5 h-1.5 w-full overflow-hidden rounded-full bg-secondary">
                  <div className="h-full rounded-full bg-primary" style={{ width: `${progressPct}%` }} />
                </div>
              </div>
            )}
          </Card>
        );
      })}
    </div>
  );
}
