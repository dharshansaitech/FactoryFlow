import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { productionEvents } from "@/lib/mock-data";
import { STATUS_STYLES, type StatusKey } from "@/lib/design-tokens";
import { formatTime } from "@/lib/format-time";
import { cn } from "@/lib/utils";
import type { EventSeverity } from "@/lib/types";

const SEVERITY_TO_TONE: Record<EventSeverity, StatusKey> = {
  INFO: "completed",
  WARNING: "warning",
  CRITICAL: "critical",
};

export function ActivityTimeline() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Activity Timeline</CardTitle>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[360px]">
          <ol className="flex flex-col gap-3 pr-2">
            {productionEvents.map((event) => {
              const style = STATUS_STYLES[SEVERITY_TO_TONE[event.severity]];
              return (
                <li key={event.id} className="flex gap-2.5">
                  <div className="flex flex-col items-center pt-1">
                    <span className={cn("size-2 shrink-0 rounded-full", style.dot)} />
                    <span className="mt-1 w-px flex-1 bg-border" />
                  </div>
                  <div className="min-w-0 flex-1 pb-1">
                    <div className="flex items-center justify-between gap-2">
                      <span className="font-data text-[11px] text-muted-foreground">{formatTime(event.timestamp)}</span>
                      {event.lineName && (
                        <span className="truncate text-[11px] text-muted-foreground">
                          {event.lineName}
                          {event.machineName ? ` · ${event.machineName}` : ""}
                        </span>
                      )}
                    </div>
                    <p className="mt-0.5 text-xs leading-relaxed text-foreground/90">{event.message}</p>
                  </div>
                </li>
              );
            })}
          </ol>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
