"use client";

import { useEffect, useState } from "react";
import { Menu, Building2, ChevronDown, Check, LogOut, Settings, UserCircle, Bell } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { SidebarBrand, SidebarNav } from "@/components/layout/app-sidebar";
import { currentFactory, alerts } from "@/lib/mock-data";
import type { RoleName } from "@/lib/types";

const ROLE_LABELS: Record<RoleName, string> = {
  OPERATOR: "Operator",
  SUPERVISOR: "Supervisor",
  ENGINEER: "Engineer",
  QUALITY_ENGINEER: "Quality Engineer",
  PLANT_MANAGER: "Plant Manager",
  DIRECTOR: "Director",
  ADMIN: "Administrator",
};

const ROLES = Object.keys(ROLE_LABELS) as RoleName[];

function LiveClock() {
  const [now, setNow] = useState<Date | null>(() => new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setNow(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const time = now
    ? now.toLocaleTimeString("en-IN", {
        timeZone: "Asia/Kolkata",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      })
    : "--:--:--";

  const date = now
    ? now.toLocaleDateString("en-IN", {
        timeZone: "Asia/Kolkata",
        weekday: "short",
        day: "2-digit",
        month: "short",
      })
    : "";

  return (
    <div className="hidden flex-col items-end leading-tight sm:flex">
      <span className="font-data text-sm text-foreground tabular-nums">{time}</span>
      <span className="text-[11px] text-muted-foreground">{date ? `${date} · IST` : ""}</span>
    </div>
  );
}

function FactorySelector() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        render={
          <Button variant="ghost" className="gap-2 px-2.5">
            <Building2 className="size-4 text-muted-foreground" />
            <span className="hidden flex-col items-start leading-tight md:flex">
              <span className="text-sm font-medium">{currentFactory.code}</span>
            </span>
            <ChevronDown className="size-3.5 text-muted-foreground" />
          </Button>
        }
      />
      <DropdownMenuContent align="start" className="w-64">
        <DropdownMenuLabel>Factories</DropdownMenuLabel>
        <DropdownMenuItem className="flex items-start gap-2">
          <Check className="mt-0.5 size-3.5 text-primary" />
          <div className="flex flex-col">
            <span className="font-medium">{currentFactory.name}</span>
            <span className="text-xs text-muted-foreground">
              {currentFactory.code} · {currentFactory.location}
            </span>
          </div>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem disabled className="text-muted-foreground">
          More factories — Phase 6
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

function RoleSwitcher() {
  const [role, setRole] = useState<RoleName>("PLANT_MANAGER");

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        render={
          <Button variant="outline" size="sm" className="gap-2">
            <UserCircle className="size-4 text-muted-foreground" />
            <span className="hidden sm:inline">{ROLE_LABELS[role]}</span>
            <ChevronDown className="size-3.5 text-muted-foreground" />
          </Button>
        }
      />
      <DropdownMenuContent align="end" className="w-52">
        <DropdownMenuLabel>View as role</DropdownMenuLabel>
        {ROLES.map((r) => (
          <DropdownMenuItem key={r} onClick={() => setRole(r)} className="justify-between">
            {ROLE_LABELS[r]}
            {role === r && <Check className="size-3.5 text-primary" />}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

function AlertBell() {
  const openCount = alerts.filter((a) => a.status === "OPEN").length;
  const criticalOpen = alerts.some((a) => a.status === "OPEN" && a.severity === "CRITICAL");

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        render={
          <Button variant="ghost" size="icon" className="relative">
            <Bell className={criticalOpen ? "size-4 text-status-critical" : "size-4 text-muted-foreground"} />
            {openCount > 0 && (
              <Badge
                variant={criticalOpen ? "destructive" : "default"}
                className="absolute -right-1 -top-1 h-4.5 min-w-4.5 rounded-full px-1 text-[10px]"
              >
                {openCount}
              </Badge>
            )}
            <span className="sr-only">Open alerts</span>
          </Button>
        }
      />
      <DropdownMenuContent align="end" className="w-80">
        <DropdownMenuLabel>Open Alerts ({openCount})</DropdownMenuLabel>
        {alerts
          .filter((a) => a.status === "OPEN")
          .slice(0, 5)
          .map((a) => (
            <DropdownMenuItem key={a.id} className="flex flex-col items-start gap-0.5 whitespace-normal py-1.5">
              <span className="text-sm font-medium">{a.title}</span>
              <span className="line-clamp-2 text-xs text-muted-foreground">{a.message}</span>
            </DropdownMenuItem>
          ))}
        <DropdownMenuSeparator />
        <DropdownMenuItem render={<a href="/alerts" />} className="justify-center text-primary">
          View Alert Center
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

function UserMenu() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        render={
          <Button variant="ghost" className="gap-2 px-1.5">
            <Avatar size="sm">
              <AvatarFallback>AM</AvatarFallback>
            </Avatar>
            <ChevronDown className="hidden size-3.5 text-muted-foreground sm:inline" />
          </Button>
        }
      />
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuLabel>
          <div className="flex flex-col">
            <span className="font-medium text-foreground">Alex Morgan</span>
            <span className="text-xs text-muted-foreground">alex.morgan@factoryflow.app</span>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => alert("Preferences — coming soon")}>
          <Settings className="size-4" />
          Preferences
        </DropdownMenuItem>
        <DropdownMenuItem variant="destructive" onClick={() => alert("Sign out — coming soon")}>
          <LogOut className="size-4" />
          Sign out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export function TopBar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="flex h-16 shrink-0 items-center justify-between gap-3 border-b border-border bg-background px-4 lg:px-6">
      <div className="flex items-center gap-2">
        <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
          <SheetContent side="left" className="w-72 p-0" showCloseButton>
            <SheetHeader className="sr-only">
              <SheetTitle>Navigation</SheetTitle>
            </SheetHeader>
            <SidebarBrand />
            <SidebarNav onNavigate={() => setMobileOpen(false)} />
          </SheetContent>
        </Sheet>
        <Button variant="ghost" size="icon" className="lg:hidden" onClick={() => setMobileOpen(true)}>
          <Menu className="size-4.5" />
          <span className="sr-only">Open navigation</span>
        </Button>
        <FactorySelector />
      </div>

      <div className="flex items-center gap-2 sm:gap-3">
        <LiveClock />
        <RoleSwitcher />
        <AlertBell />
        <UserMenu />
      </div>
    </header>
  );
}
