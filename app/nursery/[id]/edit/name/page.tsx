"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { BackHeader } from "@/components/layout/BackHeader";
import { DiscardChangesDialog } from "@/components/nursery/DiscardChangesDialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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
          <Button
            size="sm"
            onClick={handleSave}
            disabled={!isValid || !hasChanges}
          >
            完了
          </Button>
        }
      />

      <main className="mx-auto max-w-lg px-4 py-6">
        <h1 className="mb-6 font-bold text-lg">園名を編集</h1>
        <Label htmlFor="nursery-name" className="sr-only">
          園名
        </Label>
        <Input
          ref={inputRef}
          id="nursery-name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="園名を入力"
        />
        {!isValid && name.length > 0 && (
          <p className="mt-2 text-destructive text-sm">
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
