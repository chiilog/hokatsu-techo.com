"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { BackHeader } from "@/components/layout/BackHeader";
import { DiscardChangesDialog } from "@/components/nursery/DiscardChangesDialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ToastContainer } from "@/components/ui/toast";
import { useHydrated } from "@/hooks/useHydrated";
import { useToast } from "@/hooks/useToast";
import { startSlideTransition } from "@/lib/viewTransition";
import { useNurseryStore } from "@/stores/nurseryStore";

export default function EditMemoPage() {
  const params = useParams<{ id: string }>();
  const router = useRouter();
  const id = params.id;
  const hydrated = useHydrated();

  const nursery = useNurseryStore((s) => s.nurseries.find((n) => n.id === id));
  const updateNursery = useNurseryStore((s) => s.updateNursery);

  const [memo, setMemo] = useState("");
  const [initialized, setInitialized] = useState(false);
  const [showDiscardDialog, setShowDiscardDialog] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const { toasts, showToast, removeToast } = useToast();

  useEffect(() => {
    if (hydrated && nursery && !initialized) {
      setMemo(nursery.memo);
      setInitialized(true);
      textareaRef.current?.focus();
    }
  }, [hydrated, nursery, initialized]);

  const hasChanges = initialized && memo !== (nursery?.memo ?? "");

  const navigateBack = () => {
    startSlideTransition("back", () => {
      router.replace(`/nursery/${id}`);
    });
  };

  const handleSave = () => {
    try {
      updateNursery(id, { memo });
      navigateBack();
    } catch {
      showToast("保存できませんでした。もう一度お試しください", {
        type: "error",
      });
    }
  };

  const handleBack = () => {
    if (hasChanges) {
      setShowDiscardDialog(true);
    } else {
      navigateBack();
    }
  };

  const handleDiscard = () => {
    setShowDiscardDialog(false);
    navigateBack();
  };

  if (!hydrated) return null;

  if (!nursery) {
    return (
      <>
        <BackHeader onBack={() => navigateBack()} />
        <main className="mx-auto max-w-lg px-4 py-6">
          <p className="text-muted-foreground">園が見つかりません。</p>
        </main>
      </>
    );
  }

  return (
    <>
      <BackHeader
        onBack={handleBack}
        actions={
          <Button size="sm" onClick={handleSave} disabled={!hasChanges}>
            完了
          </Button>
        }
      />

      <main className="mx-auto max-w-lg px-4 py-6">
        <h1 className="mb-6 font-bold text-lg">メモを編集</h1>
        <Label htmlFor="nursery-memo" className="sr-only">
          メモ
        </Label>
        <Textarea
          ref={textareaRef}
          id="nursery-memo"
          value={memo}
          onChange={(e) => setMemo(e.target.value)}
          placeholder="気づいたことを自由に書けます"
          rows={12}
          className="min-h-[50vh] resize-none"
        />
      </main>

      <DiscardChangesDialog
        open={showDiscardDialog}
        onDiscard={handleDiscard}
        onCancel={() => setShowDiscardDialog(false)}
      />

      <ToastContainer toasts={toasts} onRemove={removeToast} />
    </>
  );
}
