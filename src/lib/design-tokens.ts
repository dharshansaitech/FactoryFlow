/**
 * FactoryFlow status color system.
 *
 * Canonical mapping used across every module (Command Center, WIP, Rack/Bin,
 * X-Out, Alerts). Keep this the single source of truth — components should
 * derive Tailwind classes from `STATUS_STYLES`, never hardcode colors.
 */

import type { AlertSeverity, AlertStatus, BoardStatus, LineStatus, MachineStatus } from "@/lib/types";

export type StatusKey =
  | "running"
  | "completed"
  | "warning"
  | "hold"
  | "critical"
  | "offline";

export interface StatusStyle {
  label: string;
  hex: string;
  /** Badge/pill background + text + border */
  badge: string;
  /** Solid dot indicator */
  dot: string;
  /** Text-only color */
  text: string;
  /** Optional glow class for "live" emphasis */
  glow?: string;
}

export const STATUS_STYLES: Record<StatusKey, StatusStyle> = {
  running: {
    label: "Running",
    hex: "#22C55E",
    badge: "bg-status-running/15 text-status-running border-status-running/30",
    dot: "bg-status-running",
    text: "text-status-running",
    glow: "status-glow-running",
  },
  completed: {
    label: "Completed",
    hex: "#3B82F6",
    badge: "bg-status-completed/15 text-status-completed border-status-completed/30",
    dot: "bg-status-completed",
    text: "text-status-completed",
  },
  warning: {
    label: "Warning",
    hex: "#EAB308",
    badge: "bg-status-warning/15 text-status-warning border-status-warning/30",
    dot: "bg-status-warning",
    text: "text-status-warning",
    glow: "status-glow-warning",
  },
  hold: {
    label: "Hold",
    hex: "#F97316",
    badge: "bg-status-hold/15 text-status-hold border-status-hold/30",
    dot: "bg-status-hold",
    text: "text-status-hold",
  },
  critical: {
    label: "Critical",
    hex: "#EF4444",
    badge: "bg-status-critical/15 text-status-critical border-status-critical/30",
    dot: "bg-status-critical",
    text: "text-status-critical",
    glow: "status-glow-critical",
  },
  offline: {
    label: "Offline",
    hex: "#6B7280",
    badge: "bg-status-offline/15 text-status-offline border-status-offline/30",
    dot: "bg-status-offline",
    text: "text-status-offline",
  },
};

export function getStatusStyle(status: StatusKey): StatusStyle {
  return STATUS_STYLES[status];
}

/** Chart series colors — keep aligned with --chart-1..5 in globals.css */
export const CHART_COLORS = {
  throughput: "#3B82F6",
  yield: "#22C55E",
  wip: "#EAB308",
  rework: "#F97316",
  utilization: "#8B5CF6",
} as const;

/** Map a production line's run state onto the 6-color status system. */
export function lineStatusToStatusKey(status: LineStatus): StatusKey {
  switch (status) {
    case "RUNNING":
      return "running";
    case "HOLD":
      return "hold";
    case "MAINTENANCE":
      return "completed";
    case "IDLE":
    case "OFFLINE":
    default:
      return "offline";
  }
}

/** Map a machine's run state onto the 6-color status system. */
export function machineStatusToStatusKey(status: MachineStatus): StatusKey {
  switch (status) {
    case "RUNNING":
      return "running";
    case "WARNING":
      return "warning";
    case "HOLD":
      return "hold";
    case "CRITICAL":
      return "critical";
    case "OFFLINE":
    default:
      return "offline";
  }
}

/** Map a board's lifecycle state onto the 6-color status system. */
export function boardStatusToStatusKey(status: BoardStatus): StatusKey {
  switch (status) {
    case "IN_PROGRESS":
      return "running";
    case "COMPLETED":
    case "SHIPPED":
      return "completed";
    case "HOLD":
      return "hold";
    case "REWORK":
      return "warning";
    case "XOUT":
      return "critical";
    default:
      return "offline";
  }
}

/** Map an alert severity onto the 6-color status system. */
export function alertSeverityToStatusKey(severity: AlertSeverity): StatusKey {
  switch (severity) {
    case "CRITICAL":
      return "critical";
    case "WARNING":
      return "warning";
    case "INFO":
    default:
      return "completed";
  }
}

/** Map an alert's workflow state onto the 6-color status system. */
export function alertStatusToStatusKey(status: AlertStatus): StatusKey {
  switch (status) {
    case "OPEN":
      return "critical";
    case "ACKNOWLEDGED":
      return "warning";
    case "RESOLVED":
    default:
      return "running";
  }
}
