import Link from "next/link";
import { AlertTriangle, Info, OctagonAlert } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { alerts } from "@/lib/mock-data";
import { STATUS_STYLES, alertSeverityToStatusKey } from "@/lib/design-tokens";
import { formatTime } from "@/lib/format-time";
import { cn } from "@/lib/utils";
import type { AlertSeverity } from "@/lib/types";

const SEVERITY_ICONS: Record<AlertSeverity, typeof OctagonAlert> = {
  CRITICAL: OctagonAlert,
  WARNING: AlertTriangle,
  INFO: Info,
};

export function LiveAlertFeed() {
  const openAlerts = alerts
    .filter((alert) => alert.status === "OPEN")
    .sort((a, b) => {
      const sevOrder: Record<AlertSeverity, number> = { CRITICAL: 0, WARNING: 1, INFO: 2 };
      return sevOrder[a.severity] - sevOrder[b.severity] || b.createdAt.localeCompare(a.createdAt);
    });

  return (
    <Card>
      <CardHeader className="flex-row items-center justify-between">
        <CardTitle>Live Alerts</CardTitle>
        <span className="font-data text-xs text-muted-foreground">{openAlerts.length} open</span>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[360px]">
          <div className="flex flex-col gap-2 pr-2">
            {openAlerts.map((alert) => {
              const tone = alertSeverityToStatusKey(alert.severity);
              const style = STATUS_STYLES[tone];
              const Icon = SEVERITY_ICONS[alert.severity];
              return (
                <div key={alert.id} className="rounded-md border border-border bg-secondary/40 p-2.5">
                  <div className="flex items-start gap-2">
                    <Icon className={cn("mt-0.5 size-3.5 shrink-0", style.text)} />
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center justify-between gap-2">
                        <p className="truncate text-xs font-medium text-foreground">{alert.title}</p>
                        <span className="shrink-0 font-data text-[11px] text-muted-foreground">
                          {formatTime(alert.createdAt)}
                        </span>
                      </div>
                      <p className="mt-0.5 text-[11px] leading-relaxed text-muted-foreground">{alert.message}</p>
                      {alert.lineName && (
                        <p className="mt-1 text-[11px] text-muted-foreground">
                          {alert.lineName}
                          {alert.machineName ? ` · ${alert.machineName}` : ""}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </ScrollArea>
        <Link
          href="/alerts"
          className="mt-3 block text-center text-xs font-medium text-primary hover:underline"
        >
          View Alert Center
        </Link>
      </CardContent>
    </Card>
  );
}
