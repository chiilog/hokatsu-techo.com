export function formatVisitDate(dateString: string | null): string {
  if (!dateString) return "未定";
  const date = new Date(dateString);
  if (Number.isNaN(date.getTime())) return "未定";
  return date.toLocaleDateString("ja-JP");
}

export function toISODateString(
  year: number,
  month: number,
  day: number,
): string {
  const m = String(month + 1).padStart(2, "0");
  const d = String(day).padStart(2, "0");
  return `${year}-${m}-${d}`;
}

export function getTodayISO(): string {
  const d = new Date();
  return toISODateString(d.getFullYear(), d.getMonth(), d.getDate());
}

export function formatDateJP(dateString: string): string {
  const date = new Date(dateString);
  const weekdays = ["日", "月", "火", "水", "木", "金", "土"];
  const y = date.getFullYear();
  const m = date.getMonth() + 1;
  const d = date.getDate();
  const w = weekdays[date.getDay()];
  return `${y}年${m}月${d}日（${w}）`;
}
