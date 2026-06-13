import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { StatusBadge } from "@/components/layout/status-badge";
import { alertSeverityToStatusKey, alertStatusToStatusKey } from "@/lib/design-tokens";
import { alerts } from "@/lib/mock-data";
import { formatTime } from "@/lib/format-time";

export default function AlertsPage() {
  const sorted = [...alerts].sort((a, b) => +new Date(b.createdAt) - +new Date(a.createdAt));

  return (
    <div className="flex flex-col gap-6 p-4 lg:p-6">
      <div>
        <h1 className="text-xl font-semibold tracking-tight text-foreground">Alert Center</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Unified feed of critical, warning, and informational alerts across the plant.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Alerts</CardTitle>
          <CardDescription>All alerts, newest first</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Severity</TableHead>
                <TableHead>Title</TableHead>
                <TableHead>Message</TableHead>
                <TableHead>Line</TableHead>
                <TableHead>Machine</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Created</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sorted.map((alert) => (
                <TableRow key={alert.id}>
                  <TableCell>
                    <StatusBadge status={alertSeverityToStatusKey(alert.severity)} label={alert.severity} />
                  </TableCell>
                  <TableCell className="text-foreground">{alert.title}</TableCell>
                  <TableCell className="max-w-md truncate text-muted-foreground" title={alert.message}>
                    {alert.message}
                  </TableCell>
                  <TableCell className="text-muted-foreground">{alert.lineName ?? "—"}</TableCell>
                  <TableCell className="text-muted-foreground">{alert.machineName ?? "—"}</TableCell>
                  <TableCell>
                    <StatusBadge status={alertStatusToStatusKey(alert.status)} label={alert.status} />
                  </TableCell>
                  <TableCell className="font-data text-xs text-muted-foreground">{formatTime(alert.createdAt)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
