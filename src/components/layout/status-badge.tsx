import { STATUS_STYLES, type StatusKey } from "@/lib/design-tokens";
import { cn } from "@/lib/utils";

interface StatusBadgeProps {
  status: StatusKey;
  /** Override the default label (e.g. show the raw enum value) */
  label?: string;
  className?: string;
  /** Apply the live glow effect for running/critical/warning states */
  glow?: boolean;
}

export function StatusBadge({ status, label, className, glow }: StatusBadgeProps) {
  const style = STATUS_STYLES[status];
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-2 py-0.5 text-xs font-medium whitespace-nowrap",
        style.badge,
        glow && style.glow,
        className
      )}
    >
      <span className={cn("size-1.5 rounded-full", style.dot)} />
      {label ?? style.label}
    </span>
  );
}

export function StatusDot({ status, className }: { status: StatusKey; className?: string }) {
  const style = STATUS_STYLES[status];
  return <span className={cn("inline-block size-2 rounded-full", style.dot, className)} />;
}
