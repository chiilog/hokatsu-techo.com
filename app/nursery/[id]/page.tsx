"use client";

import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { BackHeader } from "@/components/layout/BackHeader";
import { DeleteNurseryDialog } from "@/components/nursery/DeleteNurseryDialog";
import { NurseryDetail } from "@/components/nursery/NurseryDetail";
import { VisitTipsDialog } from "@/components/nursery/VisitTipsDialog";
import { Button } from "@/components/ui/button";
import { useHydrated } from "@/hooks/useHydrated";
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
        <BackHeader backHref="/" title="園が見つかりません" />
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
      <BackHeader backHref="/" title="園の詳細" />

      <main className="mx-auto max-w-lg px-4 py-6">
        <NurseryDetail
          nursery={nursery}
          onVisitTipsClick={() => setShowVisitTipsManual(true)}
        />

        <div className="mt-12 border-t pt-6">
          <Button
            variant="destructive-outline"
            className="w-full"
            onClick={() => setShowDeleteDialog(true)}
          >
            この園を削除する
          </Button>
        </div>
      </main>

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
