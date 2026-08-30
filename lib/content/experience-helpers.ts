import { formatDuration } from "@/lib/duration";
import type { ExperienceRole } from "./schemas";

export function roleDuration(role: ExperienceRole): string {
  if (role.endDate === null) return formatDuration(role.startDate);
  return role.historicalDuration ?? formatDuration(role.startDate, role.endDate);
}

export function groupTotalDuration(roles: ExperienceRole[]): string {
  const starts = roles.map((r) => new Date(r.startDate).getTime());
  const earliestStart = new Date(Math.min(...starts)).toISOString().slice(0, 10);
  const stillOngoing = roles.some((r) => r.endDate === null);
  if (stillOngoing) return formatDuration(earliestStart);
  const ends = roles.map((r) => new Date(r.endDate as string).getTime());
  const latestEnd = new Date(Math.max(...ends)).toISOString().slice(0, 10);
  return formatDuration(earliestStart, latestEnd);
}
