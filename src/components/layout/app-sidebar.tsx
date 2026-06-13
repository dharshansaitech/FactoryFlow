"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { CircuitBoard } from "lucide-react";
import { NAV_ITEMS } from "@/lib/nav";
import { cn } from "@/lib/utils";

export function SidebarNav({ onNavigate }: { onNavigate?: () => void }) {
  const pathname = usePathname();

  return (
    <nav className="flex flex-1 flex-col gap-1 overflow-y-auto px-3 py-4">
      {NAV_ITEMS.map((item) => {
        const isActive = pathname === item.href;
        const Icon = item.icon;
        return (
          <Link
            key={item.href}
            href={item.href}
            onClick={onNavigate}
            className={cn(
              "group flex items-center gap-3 rounded-md border border-transparent px-3 py-2.5 text-sm font-medium transition-colors",
              isActive
                ? "border-primary/20 bg-sidebar-accent text-sidebar-foreground"
                : "text-muted-foreground hover:bg-sidebar-accent/60 hover:text-sidebar-foreground"
            )}
          >
            <Icon
              className={cn(
                "size-4.5 shrink-0",
                isActive ? "text-primary" : "text-muted-foreground group-hover:text-sidebar-foreground"
              )}
            />
            <span className="truncate">{item.title}</span>
          </Link>
        );
      })}
    </nav>
  );
}

export function SidebarBrand() {
  return (
    <div className="flex h-16 items-center gap-2.5 border-b border-sidebar-border px-5">
      <div className="flex size-8 items-center justify-center rounded-md bg-primary/15 text-primary">
        <CircuitBoard className="size-4.5" />
      </div>
      <div className="flex flex-col leading-tight">
        <span className="font-semibold tracking-tight text-sidebar-foreground">FactoryFlow</span>
        <span className="text-[11px] text-muted-foreground">Manufacturing Ops Platform</span>
      </div>
    </div>
  );
}

export function AppSidebar() {
  return (
    <aside className="hidden h-screen w-64 shrink-0 flex-col border-r border-sidebar-border bg-sidebar lg:flex">
      <SidebarBrand />
      <SidebarNav />
      <div className="border-t border-sidebar-border px-5 py-3 text-[11px] text-muted-foreground">
        <p className="font-data">FactoryFlow v0.1.0 · Phase 1</p>
        <p>Bengaluru Plant — BLR-01</p>
      </div>
    </aside>
  );
}
