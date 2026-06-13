import { AlertTriangle, Clock, Layers3, PauseCircle } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { KPITile } from "@/components/dashboard/kpi-tile";
import { StatusBadge } from "@/components/layout/status-badge";
import { boardStatusToStatusKey } from "@/lib/design-tokens";
import { boards, productionLines, workOrders, wipRecords } from "@/lib/mock-data";

function boardOf(boardId: string) {
  return boards.find((b) => b.id === boardId);
}

function lineOf(lineId: string) {
  return productionLines.find((l) => l.id === lineId);
}

export default function WipPage() {
  const totalWip = wipRecords.length;
  const onHold = wipRecords.filter((r) => r.isOnHold);
  const bottlenecks = wipRecords.filter((r) => r.isBottleneck);
  const avgAging = Math.round(wipRecords.reduce((sum, r) => sum + r.agingMinutes, 0) / wipRecords.length);
  const agingBoards = [...wipRecords].sort((a, b) => b.agingMinutes - a.agingMinutes).slice(0, 8);

  return (
    <div className="flex flex-col gap-6 p-4 lg:p-6">
      <div>
        <h1 className="text-xl font-semibold tracking-tight text-foreground">WIP Monitoring</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Live work-in-process across every line — aging, hold queues, and bottleneck detection.
        </p>
      </div>

      <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
        <KPITile label="Total WIP" value={totalWip} unit="boards" subtext="Tracked across all lines" icon={Layers3} tone="warning" />
        <KPITile label="On Hold" value={onHold.length} unit="boards" subtext="Awaiting release" icon={PauseCircle} tone="hold" />
        <KPITile label="Bottlenecks" value={bottlenecks.length} unit="boards" subtext="Flagged stations" icon={AlertTriangle} tone="critical" />
        <KPITile label="Avg Aging" value={avgAging} unit="min" subtext="Time at current station" icon={Clock} tone="completed" />
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Work Order Queue</CardTitle>
          <CardDescription>Planned, released, and in-progress work orders</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Order</TableHead>
                <TableHead>Product</TableHead>
                <TableHead>Line</TableHead>
                <TableHead>Progress</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {workOrders.map((wo) => {
                const pct = Math.round((wo.quantityCompleted / wo.quantityPlanned) * 100);
                return (
                  <TableRow key={wo.id}>
                    <TableCell className="font-data text-foreground">{wo.orderNumber}</TableCell>
                    <TableCell className="text-muted-foreground">{wo.productName}</TableCell>
                    <TableCell className="text-muted-foreground">{lineOf(wo.lineId)?.code}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <div className="h-1.5 w-24 overflow-hidden rounded-full bg-secondary">
                          <div className="h-full rounded-full bg-primary" style={{ width: `${pct}%` }} />
                        </div>
                        <span className="font-data text-xs tabular-nums text-muted-foreground">
                          {wo.quantityCompleted.toLocaleString("en-IN")}/{wo.quantityPlanned.toLocaleString("en-IN")}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <StatusBadge
                        status={wo.status === "ON_HOLD" ? "hold" : wo.status === "COMPLETED" || wo.status === "CLOSED" ? "completed" : "running"}
                        label={wo.status.replace("_", " ")}
                      />
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 gap-4 xl:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Hold Boards</CardTitle>
            <CardDescription>Boards currently held with a reason and elapsed time</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>DMC</TableHead>
                  <TableHead>Station</TableHead>
                  <TableHead>Aging</TableHead>
                  <TableHead>Reason</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {onHold.map((r) => {
                  const b = boardOf(r.boardId);
                  return (
                    <TableRow key={r.id}>
                      <TableCell className="font-data tabular-nums text-foreground">{b?.dmcNumber}</TableCell>
                      <TableCell className="text-muted-foreground">{r.currentStation}</TableCell>
                      <TableCell className="font-data tabular-nums text-status-hold">{r.agingMinutes} min</TableCell>
                      <TableCell className="max-w-56 truncate text-muted-foreground" title={r.holdReason ?? undefined}>
                        {r.holdReason}
                      </TableCell>
                    </TableRow>
                  );
                })}
                {onHold.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={4} className="text-center text-muted-foreground">
                      No boards on hold.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Bottleneck Stations</CardTitle>
            <CardDescription>Stations with boards exceeding normal dwell time</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Line</TableHead>
                  <TableHead>Station</TableHead>
                  <TableHead>DMC</TableHead>
                  <TableHead>Aging</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {bottlenecks.map((r) => {
                  const b = boardOf(r.boardId);
                  return (
                    <TableRow key={r.id}>
                      <TableCell className="text-muted-foreground">{lineOf(r.lineId)?.code}</TableCell>
                      <TableCell className="text-muted-foreground">{r.currentStation}</TableCell>
                      <TableCell className="font-data tabular-nums text-foreground">{b?.dmcNumber}</TableCell>
                      <TableCell className="font-data tabular-nums text-status-critical">{r.agingMinutes} min</TableCell>
                    </TableRow>
                  );
                })}
                {bottlenecks.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={4} className="text-center text-muted-foreground">
                      No bottlenecks detected.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Aging Boards</CardTitle>
          <CardDescription>Boards with the longest dwell time at their current station</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>DMC</TableHead>
                <TableHead>Part</TableHead>
                <TableHead>Line</TableHead>
                <TableHead>Station</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Aging</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {agingBoards.map((r) => {
                const b = boardOf(r.boardId);
                return (
                  <TableRow key={r.id}>
                    <TableCell className="font-data tabular-nums text-foreground">{b?.dmcNumber}</TableCell>
                    <TableCell className="text-muted-foreground">{b?.partNumber}</TableCell>
                    <TableCell className="text-muted-foreground">{lineOf(r.lineId)?.code}</TableCell>
                    <TableCell className="text-muted-foreground">{r.currentStation}</TableCell>
                    <TableCell>
                      {b && <StatusBadge status={boardStatusToStatusKey(b.status)} label={b.status.replace("_", " ")} />}
                    </TableCell>
                    <TableCell className="font-data tabular-nums text-foreground">{r.agingMinutes} min</TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
