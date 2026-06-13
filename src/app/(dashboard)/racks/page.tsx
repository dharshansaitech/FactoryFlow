"use client";

import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { StatusBadge } from "@/components/layout/status-badge";
import { boards, rackLocations, binLocations } from "@/lib/mock-data";
import type { StatusKey } from "@/lib/design-tokens";

function occupancyStatus(occupied: number, capacity: number): StatusKey {
  const pct = (occupied / capacity) * 100;
  if (pct >= 95) return "critical";
  if (pct >= 80) return "warning";
  return "running";
}

function rackOf(rackId: string) {
  return rackLocations.find((r) => r.id === rackId);
}

export default function RacksPage() {
  const [query, setQuery] = useState("");

  const result = useMemo(() => {
    const q = query.trim().toUpperCase();
    if (!q) return null;
    const board = boards.find(
      (b) => b.dmcNumber.includes(q) || b.serialNumber.toUpperCase().includes(q) || b.currentBinId?.toUpperCase().includes(q)
    );
    if (!board) return { found: false as const };
    const bin = binLocations.find((b) => b.id === board.currentBinId);
    const rack = bin ? rackOf(bin.rackId) : undefined;
    return { found: true as const, board, bin, rack };
  }, [query]);

  return (
    <div className="flex flex-col gap-6 p-4 lg:p-6">
      <div>
        <h1 className="text-xl font-semibold tracking-tight text-foreground">Rack &amp; Bin Management</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Warehouse rack and bin occupancy, with PCB-to-bin location lookup.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Location Lookup</CardTitle>
          <CardDescription>Search by DMC, serial number, or bin code to find a board&apos;s current location.</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-3">
          <div className="relative">
            <Search className="pointer-events-none absolute top-1/2 left-2.5 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search DMC, serial number, or bin code…"
              className="pl-8 font-data"
            />
          </div>
          {result && !result.found && (
            <p className="text-sm text-muted-foreground">No board found matching &quot;{query}&quot;.</p>
          )}
          {result?.found && (
            <div className="grid grid-cols-2 gap-3 rounded-md border border-border p-3 text-sm md:grid-cols-4">
              <div>
                <p className="text-xs text-muted-foreground uppercase">DMC</p>
                <p className="font-data text-foreground">{result.board.dmcNumber}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground uppercase">Part</p>
                <p className="text-foreground">{result.board.partNumber}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground uppercase">Bin</p>
                <p className="font-data text-foreground">{result.bin?.code ?? "—"}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground uppercase">Rack</p>
                <p className="text-foreground">{result.rack ? `${result.rack.code} — ${result.rack.name}` : "Not in a rack"}</p>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Rack List</CardTitle>
          <CardDescription>All racks, by zone, with bin occupancy</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Code</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Zone</TableHead>
                <TableHead>Bins</TableHead>
                <TableHead>Occupied</TableHead>
                <TableHead>Capacity</TableHead>
                <TableHead>Utilization</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {rackLocations.map((rack) => {
                const bins = binLocations.filter((b) => b.rackId === rack.id);
                const occupied = bins.reduce((sum, b) => sum + b.occupied, 0);
                const capacity = bins.reduce((sum, b) => sum + b.capacity, 0);
                const pct = Math.round((occupied / capacity) * 100);
                return (
                  <TableRow key={rack.id}>
                    <TableCell className="font-data text-foreground">{rack.code}</TableCell>
                    <TableCell className="text-muted-foreground">{rack.name}</TableCell>
                    <TableCell className="text-muted-foreground">{rack.zone}</TableCell>
                    <TableCell className="font-data tabular-nums text-muted-foreground">{rack.totalBins}</TableCell>
                    <TableCell className="font-data tabular-nums text-foreground">{occupied}</TableCell>
                    <TableCell className="font-data tabular-nums text-muted-foreground">{capacity}</TableCell>
                    <TableCell>
                      <StatusBadge status={occupancyStatus(occupied, capacity)} label={`${pct}%`} />
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Bin List</CardTitle>
          <CardDescription>Bin-level capacity and occupancy across all racks</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Bin</TableHead>
                <TableHead>Rack</TableHead>
                <TableHead>Zone</TableHead>
                <TableHead>Occupied</TableHead>
                <TableHead>Capacity</TableHead>
                <TableHead>Utilization</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {binLocations.map((bin) => {
                const rack = rackOf(bin.rackId);
                const pct = Math.round((bin.occupied / bin.capacity) * 100);
                return (
                  <TableRow key={bin.id}>
                    <TableCell className="font-data text-foreground">{bin.code}</TableCell>
                    <TableCell className="text-muted-foreground">{rack?.code}</TableCell>
                    <TableCell className="text-muted-foreground">{rack?.zone}</TableCell>
                    <TableCell className="font-data tabular-nums text-foreground">{bin.occupied}</TableCell>
                    <TableCell className="font-data tabular-nums text-muted-foreground">{bin.capacity}</TableCell>
                    <TableCell>
                      <StatusBadge status={occupancyStatus(bin.occupied, bin.capacity)} label={`${pct}%`} />
                    </TableCell>
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
