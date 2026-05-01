"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { formatDateJP, getTodayISO, toISODateString } from "@/lib/formatDate";
import { cn } from "@/lib/utils";

interface CalendarPickerProps {
  selectedDate: string | null;
  onSelect: (date: string | null) => void;
}

function getDaysInMonth(year: number, month: number): number {
  return new Date(year, month + 1, 0).getDate();
}

function getFirstDayOfWeek(year: number, month: number): number {
  return new Date(year, month, 1).getDay();
}

const WEEKDAY_LABELS = ["日", "月", "火", "水", "木", "金", "土"];

export function CalendarPicker({
  selectedDate,
  onSelect,
}: CalendarPickerProps) {
  const [viewYear, setViewYear] = useState(() =>
    (selectedDate ? new Date(selectedDate) : new Date()).getFullYear(),
  );
  const [viewMonth, setViewMonth] = useState(() =>
    (selectedDate ? new Date(selectedDate) : new Date()).getMonth(),
  );

  const today = getTodayISO();

  const daysInMonth = getDaysInMonth(viewYear, viewMonth);
  const firstDay = getFirstDayOfWeek(viewYear, viewMonth);

  const prevMonth = () => {
    if (viewMonth === 0) {
      setViewYear((y) => y - 1);
      setViewMonth(11);
    } else {
      setViewMonth((m) => m - 1);
    }
  };

  const nextMonth = () => {
    if (viewMonth === 11) {
      setViewYear((y) => y + 1);
      setViewMonth(0);
    } else {
      setViewMonth((m) => m + 1);
    }
  };

  const handleDayClick = (day: number) => {
    const dateStr = toISODateString(viewYear, viewMonth, day);
    onSelect(dateStr);
  };

  const monthLabel = `${viewYear}年${viewMonth + 1}月`;

  return (
    <div data-testid="calendar-picker">
      <div className="mb-4 text-center" data-testid="selected-date-display">
        {selectedDate ? (
          <p className="font-medium text-lg">{formatDateJP(selectedDate)}</p>
        ) : (
          <p className="text-lg text-muted-foreground">未定</p>
        )}
      </div>

      <div className="mb-3 flex items-center justify-between">
        <Button
          variant="ghost"
          size="icon"
          onClick={prevMonth}
          aria-label="前の月"
          data-testid="prev-month-button"
        >
          <ChevronLeft className="h-5 w-5" />
        </Button>
        <span className="font-medium" data-testid="month-label">
          {monthLabel}
        </span>
        <Button
          variant="ghost"
          size="icon"
          onClick={nextMonth}
          aria-label="次の月"
          data-testid="next-month-button"
        >
          <ChevronRight className="h-5 w-5" />
        </Button>
      </div>

      <div className="mb-1 grid grid-cols-7 text-center text-xs text-muted-foreground">
        {WEEKDAY_LABELS.map((label) => (
          <div key={label} className="py-1">
            {label}
          </div>
        ))}
      </div>

      {/** biome-ignore lint/a11y/useSemanticElements: スクリーンリーダー向けには role="grid"、レイアウトには CSS grid を採用 */}
      <div
        className="grid grid-cols-7 text-center"
        role="grid"
        aria-label={monthLabel}
      >
        {Array.from({ length: firstDay }, (_, i) => (
          // biome-ignore lint/suspicious/noArrayIndexKey: 月初前の空セルは交換不可能な装飾要素のため index で十分
          <div key={`empty-${i}`} className="py-2" />
        ))}

        {Array.from({ length: daysInMonth }, (_, i) => {
          const day = i + 1;
          const dateStr = toISODateString(viewYear, viewMonth, day);
          const isSelected = dateStr === selectedDate;
          const isToday = dateStr === today;

          return (
            <button
              key={day}
              type="button"
              onClick={() => handleDayClick(day)}
              className={cn(
                "mx-auto flex h-9 w-9 items-center justify-center rounded-full text-sm transition-colors",
                isSelected && "bg-primary text-primary-foreground",
                !isSelected && isToday && "border border-primary text-primary",
                !isSelected && !isToday && "hover:bg-accent active:bg-accent",
              )}
              aria-label={`${viewMonth + 1}月${day}日`}
              aria-pressed={isSelected}
              data-testid={`day-${day}`}
            >
              {day}
            </button>
          );
        })}
      </div>

      <div className="mt-6">
        <Button
          variant="outline"
          className="w-full"
          onClick={() => onSelect(null)}
          data-testid="set-undecided-button"
        >
          未定にする
        </Button>
      </div>
    </div>
  );
}
