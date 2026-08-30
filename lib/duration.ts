export function formatDuration(startISO: string, endISO?: string): string {
  const start = new Date(startISO);
  const end = endISO ? new Date(endISO) : new Date();
  let months = (end.getFullYear() - start.getFullYear()) * 12 + (end.getMonth() - start.getMonth());
  if (end.getDate() < start.getDate()) months--;
  if (months < 0) months = 0;
  const yrs = Math.floor(months / 12);
  const mos = months % 12;
  let out = "";
  if (yrs > 0) out += `${yrs} yr${yrs > 1 ? "s" : ""}`;
  if (mos > 0) out += (out ? " " : "") + `${mos} mo${mos > 1 ? "s" : ""}`;
  return out || "< 1 mo";
}
