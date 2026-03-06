export function formatVisitDate(dateString: string | null): string {
  if (!dateString) return "未定";
  const date = new Date(dateString);
  if (Number.isNaN(date.getTime())) return "未定";
  return date.toLocaleDateString("ja-JP");
}
