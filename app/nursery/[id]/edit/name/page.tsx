"use client";

import { ChevronLeft } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { DiscardChangesDialog } from "@/components/nursery/DiscardChangesDialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ToastContainer } from "@/components/ui/toast";
import { useHydrated } from "@/hooks/useHydrated";
import { useToast } from "@/hooks/useToast";
import { startSlideTransition } from "@/lib/viewTransition";
import { useNurseryStore } from "@/stores/nurseryStore";

export default function EditNamePage() {
  const params = useParams<{ id: string }>();
  const router = useRouter();
  const id = params.id;
  const hydrated = useHydrated();

  const nursery = useNurseryStore((s) => s.nurseries.find((n) => n.id === id));
  const updateNursery = useNurseryStore((s) => s.updateNursery);

  const [name, setName] = useState("");
  const [initialized, setInitialized] = useState(false);
  const [showDiscardDialog, setShowDiscardDialog] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const { toasts, showToast, removeToast } = useToast();

  useEffect(() => {
    if (hydrated && nursery && !initialized) {
      setName(nursery.name);
      setInitialized(true);
      inputRef.current?.focus();
    }
  }, [hydrated, nursery, initialized]);

  const hasChanges = initialized && name !== (nursery?.name ?? "");
  const isValid = name.trim().length > 0;

  const navigateBack = () => {
    startSlideTransition("back", () => {
      router.replace(`/nursery/${id}`);
    });
  };

  const handleSave = () => {
    if (!isValid) return;
    try {
      updateNursery(id, { name });
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
            disabled={!isValid || !hasChanges}
            data-testid="save-button"
          >
            完了
          </Button>
        </div>
      </header>

      <main className="mx-auto max-w-lg px-4 py-6">
        <h1 className="mb-6 font-bold text-lg">園名を編集</h1>
        <Input
          ref={inputRef}
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="園名を入力"
          data-testid="edit-name-input"
        />
        {!isValid && name.length > 0 && (
          <p className="mt-2 text-destructive text-sm" data-testid="name-error">
            園名を入力してください
          </p>
        )}
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
