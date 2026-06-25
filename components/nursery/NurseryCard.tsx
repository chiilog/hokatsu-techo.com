import { Calendar } from "lucide-react";
import { SlideLink } from "@/components/common/SlideLink";
import { formatVisitDate } from "@/lib/formatDate";
import { cn } from "@/lib/utils";
import type { Nursery } from "@/types/nursery";

interface NurseryCardProps {
  nursery: Nursery;
}

export function NurseryCard({ nursery }: NurseryCardProps) {
  const formattedDate = formatVisitDate(nursery.visitDate);
  const hasDate = Boolean(nursery.visitDate);

  return (
    <SlideLink
      href={`/nursery/${nursery.id}`}
      direction="forward"
      className="block rounded-xl border bg-card p-4 shadow-sm transition-colors hover:bg-accent/50"
    >
      <div className="flex items-start justify-between gap-2">
        <h2 className="font-bold text-base">{nursery.name}</h2>
        <span
          className={cn(
            "inline-flex shrink-0 items-center gap-1 rounded-full px-2 py-0.5 font-medium text-xs",
            hasDate
              ? "bg-accent text-primary"
              : "bg-muted text-muted-foreground",
          )}
        >
          {hasDate && <Calendar className="size-3" aria-hidden="true" />}
          {formattedDate}
        </span>
      </div>
      {nursery.memo && (
        <p className="mt-2 line-clamp-2 text-muted-foreground text-sm">
          {nursery.memo}
        </p>
      )}
    </SlideLink>
  );
}
