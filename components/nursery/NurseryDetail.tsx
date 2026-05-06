"use client";

import { ChevronRight } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { formatVisitDate } from "@/lib/formatDate";
import { TRANSITION_TYPE } from "@/lib/viewTransition";
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
    <div className="space-y-6" data-testid="nursery-detail">
      <div className="overflow-hidden rounded-xl border bg-card">
        <Link
          href={`/nursery/${nursery.id}/edit/name`}
          transitionTypes={[TRANSITION_TYPE.NAV_FORWARD]}
          className="flex items-center justify-between px-4 py-3 active:bg-accent"
          data-testid="edit-name-link"
          aria-label={`園名を編集: ${nursery.name}`}
        >
          <div className="min-w-0 flex-1">
            <p className="text-xs text-muted-foreground">園名</p>
            <p className="truncate font-medium" data-testid="nursery-name">
              {nursery.name}
            </p>
          </div>
          <ChevronRight
            className="ml-2 h-5 w-5 shrink-0 text-muted-foreground"
            aria-hidden="true"
          />
        </Link>

        <div className="mx-4 border-t" />

        <Link
          href={`/nursery/${nursery.id}/edit/visit-date`}
          transitionTypes={[TRANSITION_TYPE.NAV_FORWARD]}
          className="flex items-center justify-between px-4 py-3 active:bg-accent"
          data-testid="edit-date-link"
          aria-label={`見学日を編集: ${formattedDate}`}
        >
          <div className="min-w-0 flex-1">
            <p className="text-xs text-muted-foreground">見学日</p>
            <p className="truncate" data-testid="visit-date">
              {formattedDate}
            </p>
          </div>
          <ChevronRight
            className="ml-2 h-5 w-5 shrink-0 text-muted-foreground"
            aria-hidden="true"
          />
        </Link>

        <div className="mx-4 border-t" />

        <Link
          href={`/nursery/${nursery.id}/edit/memo`}
          transitionTypes={[TRANSITION_TYPE.NAV_FORWARD]}
          className="flex items-center justify-between px-4 py-3 active:bg-accent"
          data-testid="edit-memo-link"
          aria-label={
            nursery.memo ? `メモを編集: ${nursery.memo}` : "メモを追加"
          }
        >
          <div className="min-w-0 flex-1">
            <p className="text-xs text-muted-foreground">メモ</p>
            {nursery.memo ? (
              <p
                className="whitespace-pre-wrap break-words text-sm"
                data-testid="memo-display"
              >
                {nursery.memo}
              </p>
            ) : (
              <p
                className="text-sm text-muted-foreground"
                data-testid="memo-display"
              >
                気づいたことを自由に書けます
              </p>
            )}
          </div>
          <ChevronRight
            className="ml-2 h-5 w-5 shrink-0 text-muted-foreground"
            aria-hidden="true"
          />
        </Link>
      </div>

      <div>
        <Button
          variant="link"
          onClick={onVisitTipsClick}
          className="px-0"
          data-testid="visit-tips-link"
        >
          見学のコツを見る
        </Button>
      </div>
    </div>
  );
}
