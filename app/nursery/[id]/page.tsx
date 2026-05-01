"use client";

import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useState, ViewTransition } from "react";
import { DeleteNurseryDialog } from "@/components/nursery/DeleteNurseryDialog";
import { NurseryDetail } from "@/components/nursery/NurseryDetail";
import { VisitTipsDialog } from "@/components/nursery/VisitTipsDialog";
import { Button } from "@/components/ui/button";
import { useHydrated } from "@/hooks/useHydrated";
import { SLIDE_TRANSITION_PROPS, TRANSITION_TYPE } from "@/lib/viewTransition";
import { useNurseryStore } from "@/stores/nurseryStore";

export default function NurseryDetailPage() {
  const params = useParams<{ id: string }>();
  const router = useRouter();
  const id = params.id;

  const nursery = useNurseryStore((s) => s.nurseries.find((n) => n.id === id));
  const deleteNursery = useNurseryStore((s) => s.deleteNursery);
  const hasSeenVisitTips = useNurseryStore((s) => s.hasSeenVisitTips);
  const setVisitTipsSeen = useNurseryStore((s) => s.setVisitTipsSeen);

  const hydrated = useHydrated();
  const [showVisitTipsManual, setShowVisitTipsManual] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  const showVisitTips = showVisitTipsManual || (hydrated && !hasSeenVisitTips);

  const handleVisitTipsClose = () => {
    setShowVisitTipsManual(false);
    setVisitTipsSeen();
  };

  const handleDelete = () => {
    deleteNursery(id);
    router.push("/");
  };

  if (!nursery) {
    return (
      <>
        <header className="sticky top-0 z-10 border-b bg-background">
          <div className="flex items-center gap-2 px-4 py-3">
            <Button variant="ghost" size="sm" asChild className="gap-1 px-2">
              <Link href="/" aria-label="戻る">
                <ChevronLeft className="h-5 w-5" />
                戻る
              </Link>
            </Button>
            <h1 className="font-bold text-lg">園が見つかりません</h1>
          </div>
        </header>
        <main className="mx-auto max-w-lg px-4 py-6">
          <p className="text-muted-foreground">
            この園は削除されたか、存在しません。
          </p>
        </main>
      </>
    );
  }

  return (
    <>
      <header className="sticky top-0 z-10 border-b bg-background">
        <div className="flex items-center gap-2 px-4 py-3">
          <Button variant="ghost" size="sm" asChild className="gap-1 px-2">
            <Link
              href="/"
              transitionTypes={[TRANSITION_TYPE.NAV_BACK]}
              aria-label="戻る"
            >
              <ChevronLeft className="h-5 w-5" />
              戻る
            </Link>
          </Button>
          <h1 className="font-bold text-lg">園の詳細</h1>
        </div>
      </header>

      <ViewTransition {...SLIDE_TRANSITION_PROPS}>
        <main className="mx-auto max-w-lg px-4 py-6">
          <NurseryDetail
            nursery={nursery}
            onVisitTipsClick={() => setShowVisitTipsManual(true)}
          />

          <div className="mt-12 border-t pt-6">
            <Button
              variant="destructive"
              className="w-full"
              onClick={() => setShowDeleteDialog(true)}
              data-testid="delete-nursery-button"
            >
              この園を削除する
            </Button>
          </div>
        </main>
      </ViewTransition>

      <VisitTipsDialog open={showVisitTips} onClose={handleVisitTipsClose} />

      <DeleteNurseryDialog
        open={showDeleteDialog}
        nurseryName={nursery.name}
        onConfirm={handleDelete}
        onCancel={() => setShowDeleteDialog(false)}
      />
    </>
  );
}
