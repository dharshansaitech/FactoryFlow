"use client";

import { create } from "zustand";
import { machines as initialMachines } from "@/lib/mock-data/machines";
import { productionLines as initialLines } from "@/lib/mock-data/lines";
import type { Machine, ProductionLine } from "@/lib/types";

/**
 * Phase 1 stand-in for the real-time WebSocket/MQTT layer (Phase 5).
 * `tick()` nudges throughput and machine metrics by small random deltas
 * so the Command Center feels "live" without a backend connection.
 */

function nudgeMetricValue(value: string | number, delta: number): string | number {
  if (typeof value === "number") {
    return Math.round((value + delta) * 10) / 10;
  }
  const match = value.match(/^(-?\d+(?:\.\d+)?)(.*)$/);
  if (!match) return value;
  const num = Math.max(0, parseFloat(match[1]) + delta);
  const decimals = match[1].includes(".") ? match[1].split(".")[1].length : 0;
  return `${num.toFixed(decimals)}${match[2]}`;
}

interface CommandCenterState {
  lines: ProductionLine[];
  machines: Machine[];
  lastTick: number;
  isLive: boolean;
  tick: () => void;
  setLive: (live: boolean) => void;
}

export const useCommandCenterStore = create<CommandCenterState>((set) => ({
  lines: initialLines.map((line) => ({ ...line })),
  machines: initialMachines.map((machine) => ({ ...machine, metrics: { ...machine.metrics } })),
  lastTick: Date.now(),
  isLive: true,
  setLive: (live) => set({ isLive: live }),
  tick: () =>
    set((state) => ({
      lastTick: Date.now(),
      lines: state.lines.map((line) => {
        if (line.status !== "RUNNING") return line;
        const sign = Math.random() < 0.5 ? -1 : 1;
        const delta = sign * (Math.floor(Math.random() * 4) + 1);
        const next = Math.max(0, Math.min(line.targetThroughput, line.currentThroughput + delta));
        return { ...line, currentThroughput: next };
      }),
      machines: state.machines.map((machine) => {
        if (machine.status !== "RUNNING" || !machine.metrics?.cycleTime) return machine;
        const delta = (Math.random() - 0.5) * 0.4;
        return {
          ...machine,
          metrics: {
            ...machine.metrics,
            cycleTime: nudgeMetricValue(machine.metrics.cycleTime, delta),
          },
        };
      }),
    })),
}));
