"use client";

import { ChevronLeft } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { CalendarPicker } from "@/components/ui/calendar-picker";
import { ToastContainer } from "@/components/ui/toast";
import { useHydrated } from "@/hooks/useHydrated";
import { useToast } from "@/hooks/useToast";
import { startSlideTransition } from "@/lib/viewTransition";
import { useNurseryStore } from "@/stores/nurseryStore";

export default function EditVisitDatePage() {
  const params = useParams<{ id: string }>();
  const router = useRouter();
  const id = params.id;
  const hydrated = useHydrated();

  const nursery = useNurseryStore((s) => s.nurseries.find((n) => n.id === id));
  const updateNursery = useNurseryStore((s) => s.updateNursery);

  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const { toasts, showToast, removeToast } = useToast();

  useEffect(() => {
    if (hydrated && nursery) {
      setSelectedDate(nursery.visitDate);
    }
  }, [hydrated, nursery]);

  const navigateBack = () => {
    startSlideTransition("back", () => {
      router.replace(`/nursery/${id}`);
    });
  };

  const handleSelect = (date: string | null) => {
    if (date === selectedDate) return;
    try {
      updateNursery(id, { visitDate: date });
      setSelectedDate(date);
      showToast(date ? "見学日を保存しました" : "未定に変更しました");
    } catch {
      showToast("保存できませんでした。もう一度お試しください", {
        type: "error",
      });
    }
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
        <div className="flex items-center px-4 py-3">
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
        <h1 className="mb-6 font-bold text-lg">見学日を選択</h1>
        <CalendarPicker selectedDate={selectedDate} onSelect={handleSelect} />
      </main>

      <ToastContainer toasts={toasts} onRemove={removeToast} />
    </>
  );
}
