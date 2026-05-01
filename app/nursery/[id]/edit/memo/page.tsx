"use client";

import { ChevronLeft } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import {
  addTransitionType,
  startTransition,
  useEffect,
  useRef,
  useState,
  ViewTransition,
} from "react";
import { DiscardChangesDialog } from "@/components/nursery/DiscardChangesDialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ToastContainer } from "@/components/ui/toast";
import { useHydrated } from "@/hooks/useHydrated";
import { useToast } from "@/hooks/useToast";
import { SLIDE_TRANSITION_PROPS, TRANSITION_TYPE } from "@/lib/viewTransition";
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
    startTransition(() => {
      addTransitionType(TRANSITION_TYPE.NAV_BACK);
      router.back();
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
        <header className="sticky top-0 z-10 border-b bg-background">
          <div className="flex items-center gap-2 px-4 py-3">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigateBack()}
              className="gap-1 px-2"
            >
              <ChevronLeft className="h-5 w-5" />
              戻る
            </Button>
          </div>
        </header>
        <main className="mx-auto max-w-lg px-4 py-6">
          <p className="text-muted-foreground">園が見つかりません。</p>
        </main>
      </>
    );
  }

  return (
    <>
      <header className="sticky top-0 z-10 border-b bg-background">
        <div className="flex items-center justify-between px-4 py-3">
          <Button
            variant="ghost"
            size="sm"
            onClick={handleBack}
            className="gap-1 px-2"
            data-testid="back-button"
          >
            <ChevronLeft className="h-5 w-5" />
            戻る
          </Button>
          <Button
            size="sm"
            onClick={handleSave}
            disabled={!hasChanges}
            data-testid="save-button"
          >
            完了
          </Button>
        </div>
      </header>

      <ViewTransition {...SLIDE_TRANSITION_PROPS}>
        <main className="mx-auto max-w-lg px-4 py-6">
          <h1 className="mb-6 font-bold text-lg">メモを編集</h1>
          <Textarea
            ref={textareaRef}
            value={memo}
            onChange={(e) => setMemo(e.target.value)}
            placeholder="気づいたことを自由に書けます"
            rows={12}
            className="min-h-[50vh] resize-none"
            data-testid="edit-memo-textarea"
          />
        </main>
      </ViewTransition>

      <DiscardChangesDialog
        open={showDiscardDialog}
        onDiscard={handleDiscard}
        onCancel={() => setShowDiscardDialog(false)}
      />

      <ToastContainer toasts={toasts} onRemove={removeToast} />
    </>
  );
}
