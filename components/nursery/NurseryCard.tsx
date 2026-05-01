import Link from "next/link";
import { formatVisitDate } from "@/lib/formatDate";
import { TRANSITION_TYPE } from "@/lib/viewTransition";
import type { Nursery } from "@/types/nursery";

interface NurseryCardProps {
  nursery: Nursery;
}

export function NurseryCard({ nursery }: NurseryCardProps) {
  const formattedDate = formatVisitDate(nursery.visitDate);

  return (
    <Link
      href={`/nursery/${nursery.id}`}
      transitionTypes={[TRANSITION_TYPE.NAV_FORWARD]}
      className="block rounded-lg border bg-card p-4 shadow-sm transition-colors hover:bg-accent/50"
      data-testid={`nursery-card-${nursery.id}`}
    >
      <div className="flex items-start justify-between gap-2">
        <h2 className="font-medium text-base">{nursery.name}</h2>
        <span className="shrink-0 text-muted-foreground text-sm">
          {formattedDate}
        </span>
      </div>
      {nursery.memo && (
        <p className="mt-2 line-clamp-2 text-muted-foreground text-sm">
          {nursery.memo}
        </p>
      )}
    </Link>
  );
}
