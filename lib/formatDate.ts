// new Date("YYYY-MM-DD") は UTC 解釈でタイムゾーンによって日付がずれるため、ローカル時刻で生成する
export function parseISODate(dateString: string): Date {
  const [year, month, day] = dateString.split("-").map(Number);
  return new Date(year, month - 1, day);
}

export function formatVisitDate(dateString: string | null): string {
  if (!dateString) return "未定";
  const date = parseISODate(dateString);
  if (Number.isNaN(date.getTime())) return "未定";
  return date.toLocaleDateString("ja-JP");
}

export function toISODateString(
  year: number,
  monthIndex: number,
  day: number,
): string {
  const m = String(monthIndex + 1).padStart(2, "0");
  const d = String(day).padStart(2, "0");
  return `${year}-${m}-${d}`;
}

export function getTodayISO(): string {
  const d = new Date();
  return toISODateString(d.getFullYear(), d.getMonth(), d.getDate());
}

export function formatDateJP(dateString: string): string {
  const date = parseISODate(dateString);
  if (Number.isNaN(date.getTime())) return dateString;
  const weekdays = ["日", "月", "火", "水", "木", "金", "土"];
  const y = date.getFullYear();
  const m = date.getMonth() + 1;
  const d = date.getDate();
  const w = weekdays[date.getDay()];
  return `${y}年${m}月${d}日（${w}）`;
}
