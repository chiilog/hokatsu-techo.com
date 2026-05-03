"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { getTodayISO } from "@/lib/formatDate";
import { cn } from "@/lib/utils";

interface NurseryFormProps {
  onAdd: (name: string, visitDate: string | null) => void;
}

type VisitDateOption = "today" | "later";

export function NurseryForm({ onAdd }: NurseryFormProps) {
  const [name, setName] = useState("");
  const [visitDateOption, setVisitDateOption] =
    useState<VisitDateOption>("later");

  const isValid = name.trim().length > 0;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isValid) return;

    const visitDate = visitDateOption === "today" ? getTodayISO() : null;
    onAdd(name, visitDate);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6"
      data-testid="nursery-form"
    >
      <div className="space-y-2">
        <Label htmlFor="nursery-name">園名</Label>
        <Input
          id="nursery-name"
          type="text"
          placeholder="例：さくら保育園"
          value={name}
          onChange={(e) => setName(e.target.value)}
          data-testid="nursery-name-input"
        />
      </div>

      <div className="space-y-2">
        <Label>見学日</Label>
        <div className="grid grid-cols-2 gap-3">
          <button
            type="button"
            onClick={() => setVisitDateOption("today")}
            aria-pressed={visitDateOption === "today"}
            className={cn(
              "rounded-xl border-2 px-4 py-3 text-center text-sm font-medium transition-colors",
              visitDateOption === "today"
                ? "border-primary bg-primary/5 text-primary"
                : "border-border text-muted-foreground hover:border-primary/50",
            )}
            data-testid="visit-date-today"
          >
            今日
          </button>
          <button
            type="button"
            onClick={() => setVisitDateOption("later")}
            aria-pressed={visitDateOption === "later"}
            className={cn(
              "rounded-xl border-2 px-4 py-3 text-center text-sm font-medium transition-colors",
              visitDateOption === "later"
                ? "border-primary bg-primary/5 text-primary"
                : "border-border text-muted-foreground hover:border-primary/50",
            )}
            data-testid="visit-date-later"
          >
            あとで設定する
          </button>
        </div>
      </div>

      <Button
        type="submit"
        className="w-full"
        disabled={!isValid}
        data-testid="add-nursery-button"
      >
        追加する
      </Button>
    </form>
  );
}
