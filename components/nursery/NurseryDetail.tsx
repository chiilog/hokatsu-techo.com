"use client";

import { BookOpenText, ChevronRight } from "lucide-react";
import { SlideLink } from "@/components/common/SlideLink";
import { Button } from "@/components/ui/button";
import { formatVisitDate } from "@/lib/formatDate";
import type { Nursery } from "@/types/nursery";

interface NurseryDetailProps {
  nursery: Nursery;
  onVisitTipsClick: () => void;
}

export function NurseryDetail({
  nursery,
  onVisitTipsClick,
}: NurseryDetailProps) {
  const formattedDate = formatVisitDate(nursery.visitDate);

  return (
    <div className="space-y-6">
      <div className="overflow-hidden rounded-xl border bg-card">
        <SlideLink
          href={`/nursery/${nursery.id}/edit/name`}
          direction="forward"
          className="flex items-center justify-between px-4 py-3 active:bg-accent"
          aria-label={`園名を編集: ${nursery.name}`}
        >
          <div className="min-w-0 flex-1">
            <p className="text-xs text-muted-foreground">園名</p>
            <p className="truncate font-medium">{nursery.name}</p>
          </div>
          <ChevronRight
            className="ml-2 h-5 w-5 shrink-0 text-muted-foreground"
            aria-hidden="true"
          />
        </SlideLink>

        <div className="mx-4 border-t" />

        <SlideLink
          href={`/nursery/${nursery.id}/edit/visit-date`}
          direction="forward"
          className="flex items-center justify-between px-4 py-3 active:bg-accent"
          aria-label={`見学日を編集: ${formattedDate}`}
        >
          <div className="min-w-0 flex-1">
            <p className="text-xs text-muted-foreground">見学日</p>
            <p className="truncate">{formattedDate}</p>
          </div>
          <ChevronRight
            className="ml-2 h-5 w-5 shrink-0 text-muted-foreground"
            aria-hidden="true"
          />
        </SlideLink>

        <div className="mx-4 border-t" />

        <SlideLink
          href={`/nursery/${nursery.id}/edit/memo`}
          direction="forward"
          className="flex items-center justify-between px-4 py-3 active:bg-accent"
          aria-label={
            nursery.memo ? `メモを編集: ${nursery.memo}` : "メモを追加"
          }
        >
          <div className="min-w-0 flex-1">
            <p className="text-xs text-muted-foreground">メモ</p>
            {nursery.memo ? (
              <p className="whitespace-pre-wrap break-words text-sm">
                {nursery.memo}
              </p>
            ) : (
              <p className="text-sm text-muted-foreground">
                気づいたことを自由に書けます
              </p>
            )}
          </div>
          <ChevronRight
            className="ml-2 h-5 w-5 shrink-0 text-muted-foreground"
            aria-hidden="true"
          />
        </SlideLink>
      </div>

      <div>
        <Button
          variant="link"
          onClick={onVisitTipsClick}
          className="px-0 font-bold no-underline hover:no-underline"
        >
          <BookOpenText className="size-4" aria-hidden="true" />
          見学のコツを見る
        </Button>
      </div>
    </div>
  );
}
