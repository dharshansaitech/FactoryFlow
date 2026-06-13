import { Percent, RefreshCcw, Trash2, XCircle } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { KPITile } from "@/components/dashboard/kpi-tile";
import { XOutReasonChart } from "@/components/dashboard/xout-reason-chart";
import { StatusBadge } from "@/components/layout/status-badge";
import { boards, kpiSummary, workOrders, productionLines, xOutBoards } from "@/lib/mock-data";
import { formatTime } from "@/lib/format-time";

function boardOf(boardId: string) {
  return boards.find((b) => b.id === boardId);
}

export default function XOutPage() {
  const totalXOut = xOutBoards.length;
  const scrapCount = xOutBoards.filter((b) => b.disposition === "SCRAP").length;
  const reworkCount = xOutBoards.filter((b) => b.disposition === "REWORK").length;
  const yieldImpactPct = (totalXOut / kpiSummary.throughput) * 100;

  const reasonCounts = new Map<string, number>();
  for (const b of xOutBoards) {
    reasonCounts.set(b.reasonCode, (reasonCounts.get(b.reasonCode) ?? 0) + 1);
  }
  const reasonData = Array.from(reasonCounts, ([reason, count]) => ({
    reason: reason.replace("_", " "),
    count,
  }));

  return (
    <div className="flex flex-col gap-6 p-4 lg:p-6">
      <div>
        <h1 className="text-xl font-semibold tracking-tight text-foreground">X-Out Tracking</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Defective boards flagged for X-Out, root causes, and disposition workflow.
        </p>
      </div>

      <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
        <KPITile label="Total X-Out" value={totalXOut} unit="boards" subtext="Flagged this batch" icon={XCircle} tone="critical" />
        <KPITile
          label="Yield Impact"
          value={yieldImpactPct}
          unit="%"
          decimals={2}
          subtext="Of current shift throughput"
          icon={Percent}
          tone="critical"
        />
        <KPITile label="Scrap" value={scrapCount} unit="boards" subtext="Disposition: scrap" icon={Trash2} tone="hold" />
        <KPITile label="Rework" value={reworkCount} unit="boards" subtext="Disposition: rework" icon={RefreshCcw} tone="warning" />
      </div>

      <XOutReasonChart data={reasonData} />

      <Card>
        <CardHeader>
          <CardTitle>X-Out Board List</CardTitle>
          <CardDescription>Reason codes, defect locations, and disposition</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>DMC</TableHead>
                <TableHead>Part</TableHead>
                <TableHead>Line</TableHead>
                <TableHead>Reason</TableHead>
                <TableHead>Defect Location</TableHead>
                <TableHead>Disposition</TableHead>
                <TableHead>Reported</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {xOutBoards.map((x) => {
                const board = boardOf(x.boardId);
                const wo = workOrders.find((w) => w.id === board?.workOrderId);
                const line = productionLines.find((l) => l.id === wo?.lineId);
                return (
                  <TableRow key={x.id}>
                    <TableCell className="font-data tabular-nums text-foreground">{board?.dmcNumber}</TableCell>
                    <TableCell className="text-muted-foreground">{board?.partNumber}</TableCell>
                    <TableCell className="text-muted-foreground">{line?.code}</TableCell>
                    <TableCell>
                      <StatusBadge status="critical" label={x.reasonCode.replace("_", " ")} />
                    </TableCell>
                    <TableCell className="text-muted-foreground">{x.defectLocation}</TableCell>
                    <TableCell>
                      <StatusBadge status={x.disposition === "SCRAP" ? "hold" : "warning"} label={x.disposition ?? "PENDING"} />
                    </TableCell>
                    <TableCell className="font-data text-xs text-muted-foreground">{formatTime(x.reportedAt)}</TableCell>
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
