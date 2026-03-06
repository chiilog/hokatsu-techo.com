"use client";

import { ArrowLeft, Trash2 } from "lucide-react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { DeleteNurseryDialog } from "@/components/nursery/DeleteNurseryDialog";
import { NurseryDetail } from "@/components/nursery/NurseryDetail";
import { VisitTipsDialog } from "@/components/nursery/VisitTipsDialog";
import { Button } from "@/components/ui/button";
import { useNurseryStore } from "@/stores/nurseryStore";

export default function NurseryDetailPage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;

  const nursery = useNurseryStore((s) => s.nurseries.find((n) => n.id === id));
  const updateNursery = useNurseryStore((s) => s.updateNursery);
  const deleteNursery = useNurseryStore((s) => s.deleteNursery);
  const hasSeenVisitTips = useNurseryStore((s) => s.hasSeenVisitTips);
  const setVisitTipsSeen = useNurseryStore((s) => s.setVisitTipsSeen);

  const [showVisitTips, setShowVisitTips] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  useEffect(() => {
    if (!hasSeenVisitTips) {
      setShowVisitTips(true);
    }
  }, [hasSeenVisitTips]);

  const handleVisitTipsClose = () => {
    setShowVisitTips(false);
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
            <Button variant="ghost" size="icon" asChild>
              <Link href="/" aria-label="戻る">
                <ArrowLeft className="h-5 w-5" />
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
        <div className="flex items-center justify-between px-4 py-3">
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" asChild>
              <Link href="/" aria-label="戻る">
                <ArrowLeft className="h-5 w-5" />
              </Link>
            </Button>
            <h1 className="font-bold text-lg">園の詳細</h1>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setShowDeleteDialog(true)}
            aria-label="この園を削除"
            data-testid="delete-nursery-button"
          >
            <Trash2 className="h-5 w-5 text-destructive" />
          </Button>
        </div>
      </header>

      <main className="mx-auto max-w-lg px-4 py-6">
        <NurseryDetail
          nursery={nursery}
          onUpdate={(updates) => updateNursery(id, updates)}
          onVisitTipsClick={() => setShowVisitTips(true)}
        />
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
