/** Format an ISO timestamp as a plant-local (Asia/Kolkata) HH:mm time, e.g. "09:18". */
export function formatTime(iso: string): string {
  return new Intl.DateTimeFormat("en-IN", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
    timeZone: "Asia/Kolkata",
  }).format(new Date(iso));
}
