"use client";

import { useMemo, useState } from "react";
import {
  CheckCircle2,
  LogIn,
  LogOut,
  PackagePlus,
  PauseCircle,
  ScanSearch,
  Wrench,
  XCircle,
  type LucideIcon,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { StatusBadge } from "@/components/layout/status-badge";
import { boardStatusToStatusKey, STATUS_STYLES, type StatusKey } from "@/lib/design-tokens";
import { boards, productionLines, machines, workOrders, dmcRecords, inspectionRecords } from "@/lib/mock-data";
import { formatTime } from "@/lib/format-time";
import { cn } from "@/lib/utils";
import type { DMCEventType, InspectionResult } from "@/lib/types";

const RESULT_LIMIT = 8;

const EVENT_ICONS: Record<DMCEventType, LucideIcon> = {
  PANEL_LOADED: PackagePlus,
  STATION_ENTRY: LogIn,
  STATION_EXIT: LogOut,
  INSPECTION: ScanSearch,
  HOLD_APPLIED: PauseCircle,
  HOLD_RELEASED: PauseCircle,
  REWORK_START: Wrench,
  REWORK_COMPLETE: CheckCircle2,
  XOUT_FLAGGED: XCircle,
  SHIPPED: CheckCircle2,
};

const INSPECTION_TONE: Record<InspectionResult, StatusKey> = {
  PASS: "running",
  WARNING: "warning",
  FAIL: "critical",
};

function lineName(id?: string | null) {
  return productionLines.find((l) => l.id === id)?.name ?? null;
}

function machineName(id?: string | null) {
  return machines.find((m) => m.id === id)?.name ?? null;
}

export default function TraceabilityPage() {
  const [query, setQuery] = useState("");
  const [selectedId, setSelectedId] = useState("board-0010");

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    const list = !q
      ? boards
      : boards.filter(
          (b) =>
            b.dmcNumber.toLowerCase().includes(q) ||
            b.serialNumber.toLowerCase().includes(q) ||
            b.batchNumber.toLowerCase().includes(q)
        );
    return list.slice(0, RESULT_LIMIT);
  }, [query]);

  const board = results.find((b) => b.id === selectedId) ?? results[0];
  const workOrder = board ? workOrders.find((wo) => wo.id === board.workOrderId) : undefined;
  const timeline = board
    ? dmcRecords.filter((r) => r.boardId === board.id).sort((a, b) => a.timestamp.localeCompare(b.timestamp))
    : [];
  const inspections = board ? inspectionRecords.filter((r) => r.boardId === board.id) : [];

  let location = "Unknown";
  if (board) {
    if (board.status === "SHIPPED") location = "Shipped — no longer on-site";
    else if (board.currentBinId) location = `Rack/Bin ${board.currentBinId}`;
    else if (board.currentMachineId) location = `${lineName(board.currentLineId)} — ${machineName(board.currentMachineId)}`;
    else if (board.currentLineId) location = `${lineName(board.currentLineId)} — awaiting next station`;
  }

  return (
    <div className="flex flex-col gap-6 p-4 lg:p-6">
      <div>
        <h1 className="text-xl font-semibold tracking-tight text-foreground">PCB Traceability</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Search by DMC code, serial number, or batch number to trace a board&apos;s full production history.
        </p>
      </div>

      <Card>
        <CardContent className="flex flex-col gap-3">
          <div className="relative">
            <ScanSearch className="pointer-events-none absolute top-1/2 left-2.5 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search DMC, serial number, or batch number…"
              className="pl-8 font-data"
            />
          </div>
          <div className="overflow-hidden rounded-md border border-border">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border bg-secondary/40 text-left text-xs text-muted-foreground uppercase">
                  <th className="px-3 py-2 font-medium">DMC</th>
                  <th className="px-3 py-2 font-medium">Serial</th>
                  <th className="px-3 py-2 font-medium">Part</th>
                  <th className="px-3 py-2 font-medium">Batch</th>
                  <th className="px-3 py-2 font-medium">Status</th>
                </tr>
              </thead>
              <tbody>
                {results.map((b) => (
                  <tr
                    key={b.id}
                    onClick={() => setSelectedId(b.id)}
                    className={cn(
                      "cursor-pointer border-b border-border last:border-0 hover:bg-secondary/40",
                      b.id === board?.id && "bg-secondary/60"
                    )}
                  >
                    <td className="px-3 py-2 font-data tabular-nums text-foreground">{b.dmcNumber}</td>
                    <td className="px-3 py-2 font-data text-muted-foreground">{b.serialNumber}</td>
                    <td className="px-3 py-2 text-muted-foreground">{b.partNumber}</td>
                    <td className="px-3 py-2 text-muted-foreground">{b.batchNumber}</td>
                    <td className="px-3 py-2">
                      <StatusBadge status={boardStatusToStatusKey(b.status)} label={b.status.replace("_", " ")} />
                    </td>
                  </tr>
                ))}
                {results.length === 0 && (
                  <tr>
                    <td colSpan={5} className="px-3 py-6 text-center text-muted-foreground">
                      No boards match &quot;{query}&quot;.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {board && (
        <div className="grid grid-cols-1 gap-4 xl:grid-cols-3">
          <div className="flex flex-col gap-4">
            <Card>
              <CardHeader>
                <CardTitle>Board Detail</CardTitle>
                <CardDescription>{board.partNumber} Rev {board.revision}</CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col gap-3 text-sm">
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Status</span>
                  <StatusBadge status={boardStatusToStatusKey(board.status)} label={board.status.replace("_", " ")} glow />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">DMC</span>
                  <span className="font-data tabular-nums text-foreground">{board.dmcNumber}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Serial</span>
                  <span className="font-data text-foreground">{board.serialNumber}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Batch</span>
                  <span className="font-data text-foreground">{board.batchNumber}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Work Order</span>
                  <span className="text-foreground">{workOrder?.orderNumber ?? "—"}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Product</span>
                  <span className="text-right text-foreground">{workOrder?.productName ?? "—"}</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Current Location</CardTitle>
                <CardDescription>Last updated {formatTime(board.updatedAt)}</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-foreground">{location}</p>
              </CardContent>
            </Card>
          </div>

          <div className="flex flex-col gap-4 xl:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Manufacturing Timeline</CardTitle>
                <CardDescription>Station entry/exit, inspection, hold, and rework events</CardDescription>
              </CardHeader>
              <CardContent>
                {timeline.length === 0 ? (
                  <p className="text-sm text-muted-foreground">No DMC events recorded for this board.</p>
                ) : (
                  <ol className="flex flex-col gap-4">
                    {timeline.map((event, idx) => {
                      const Icon = EVENT_ICONS[event.eventType];
                      return (
                        <li key={event.id} className="flex gap-3">
                          <div className="flex flex-col items-center">
                            <div className="flex size-7 shrink-0 items-center justify-center rounded-full border border-border bg-secondary">
                              <Icon className="size-3.5 text-muted-foreground" />
                            </div>
                            {idx < timeline.length - 1 && <div className="mt-1 w-px flex-1 bg-border" />}
                          </div>
                          <div className="pb-1">
                            <div className="flex items-center gap-2 text-sm">
                              <span className="font-medium text-foreground">{event.eventType.replace(/_/g, " ")}</span>
                              <span className="text-xs text-muted-foreground">{event.stationCode}</span>
                              <span className="font-data text-xs text-muted-foreground">{formatTime(event.timestamp)}</span>
                            </div>
                            {event.notes && <p className="mt-0.5 text-xs text-muted-foreground">{event.notes}</p>}
                            {event.operatorName && (
                              <p className="mt-0.5 text-xs text-muted-foreground">Operator: {event.operatorName}</p>
                            )}
                          </div>
                        </li>
                      );
                    })}
                  </ol>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Inspection History</CardTitle>
                <CardDescription>SPI / AOI pin-level inspection results</CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col gap-4">
                {inspections.length === 0 ? (
                  <p className="text-sm text-muted-foreground">No inspection records for this board.</p>
                ) : (
                  inspections.map((insp) => (
                    <div key={insp.id} className="rounded-md border border-border p-3">
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <div className="flex items-center gap-2">
                          <StatusBadge status={INSPECTION_TONE[insp.result]} label={insp.result} />
                          <span className="text-xs text-muted-foreground">
                            {machineName(insp.machineId)} · {formatTime(insp.timestamp)}
                          </span>
                        </div>
                        <span className="text-xs text-muted-foreground">
                          {insp.defectPins} / {insp.totalPins} defect pins
                        </span>
                      </div>
                      <div className="mt-2 grid grid-cols-3 gap-2 text-xs text-muted-foreground">
                        <span>Avg height: <span className="font-data text-foreground">{insp.avgHeight.toFixed(1)} µm</span></span>
                        <span>Avg volume: <span className="font-data text-foreground">{insp.avgVolume.toFixed(3)} mm³</span></span>
                        <span>Avg area: <span className="font-data text-foreground">{insp.avgArea.toFixed(2)} mm²</span></span>
                      </div>
                      <div className="mt-3 flex flex-wrap gap-1.5">
                        {insp.pinData.map((pin) => {
                          const tone = STATUS_STYLES[INSPECTION_TONE[pin.status]];
                          return (
                            <span
                              key={pin.pinId}
                              className={cn("rounded-md border px-1.5 py-0.5 font-data text-[11px]", tone.badge)}
                              title={pin.defectType && pin.defectType !== "NONE" ? pin.defectType : undefined}
                            >
                              {pin.pinId}
                            </span>
                          );
                        })}
                      </div>
                    </div>
                  ))
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      )}
    </div>
  );
}
