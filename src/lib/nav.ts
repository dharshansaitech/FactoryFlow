import {
  LayoutDashboard,
  MonitorPlay,
  ScanSearch,
  Layers3,
  Warehouse,
  XCircle,
  BarChart3,
  BellRing,
  type LucideIcon,
} from "lucide-react";

export interface NavItem {
  title: string;
  href: string;
  icon: LucideIcon;
  description: string;
}

export const NAV_ITEMS: NavItem[] = [
  {
    title: "Executive Dashboard",
    href: "/",
    icon: LayoutDashboard,
    description: "Plant-wide OEE, throughput, yield & efficiency",
  },
  {
    title: "Factory Command Center",
    href: "/command-center",
    icon: MonitorPlay,
    description: "Live SMT line and machine status",
  },
  {
    title: "PCB Traceability",
    href: "/traceability",
    icon: ScanSearch,
    description: "DMC / serial / batch genealogy search",
  },
  {
    title: "WIP Monitoring",
    href: "/wip",
    icon: Layers3,
    description: "Work-in-process aging, holds & bottlenecks",
  },
  {
    title: "Rack & Bin Management",
    href: "/racks",
    icon: Warehouse,
    description: "Warehouse rack and bin occupancy",
  },
  {
    title: "X-Out Tracking",
    href: "/xout",
    icon: XCircle,
    description: "Defect dispositions & cost impact",
  },
  {
    title: "Production Analytics",
    href: "/analytics",
    icon: BarChart3,
    description: "Throughput, WIP, rework & utilization trends",
  },
  {
    title: "Alert Center",
    href: "/alerts",
    icon: BellRing,
    description: "Critical, hold & capacity alerts",
  },
];
