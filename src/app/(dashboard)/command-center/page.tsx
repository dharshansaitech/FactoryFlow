import { currentFactory, productionLines } from "@/lib/mock-data";
import { LiveIndicator } from "@/components/command-center/live-indicator";
import { LineCard } from "@/components/command-center/line-card";
import { LiveAlertFeed } from "@/components/command-center/live-alert-feed";
import { ActivityTimeline } from "@/components/command-center/activity-timeline";

export default function CommandCenterPage() {
  return (
    <div className="flex flex-col gap-6 p-4 lg:p-6">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h1 className="text-xl font-semibold tracking-tight text-foreground">Factory Command Center</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            {currentFactory.name} — real-time line status, machine health, and activity feed.
          </p>
        </div>
        <LiveIndicator />
      </div>

      <div className="grid grid-cols-1 gap-4 xl:grid-cols-3">
        <div className="flex flex-col gap-4 xl:col-span-2">
          {productionLines.map((line) => (
            <LineCard key={line.id} line={line} />
          ))}
        </div>
        <div className="flex flex-col gap-4">
          <LiveAlertFeed />
          <ActivityTimeline />
        </div>
      </div>
    </div>
  );
}
