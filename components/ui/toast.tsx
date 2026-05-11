"use client";

import { Check, X } from "lucide-react";
import { useEffect } from "react";
import type { Toast as ToastType } from "@/hooks/useToast";
import { cn } from "@/lib/utils";

const TOAST_DURATION = 1800;

interface ToastProps {
  toast: ToastType;
  onRemove: (id: string) => void;
}

function ToastItem({ toast, onRemove }: ToastProps) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onRemove(toast.id);
    }, TOAST_DURATION);
    return () => clearTimeout(timer);
  }, [toast.id, onRemove]);

  return (
    <div
      className={cn(
        "flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium shadow-lg",
        "animate-in fade-in slide-in-from-bottom-4 duration-200",
        "motion-reduce:animate-none",
        toast.type === "success"
          ? "bg-foreground/90 text-background"
          : "bg-destructive text-white",
      )}
    >
      {toast.type === "success" ? (
        <Check className="h-4 w-4" aria-hidden="true" />
      ) : (
        <X className="h-4 w-4" aria-hidden="true" />
      )}
      <span>{toast.message}</span>
    </div>
  );
}

interface ToastContainerProps {
  toasts: ToastType[];
  onRemove: (id: string) => void;
}

export function ToastContainer({ toasts, onRemove }: ToastContainerProps) {
  return (
    <div
      className="fixed bottom-6 left-1/2 z-50 flex -translate-x-1/2 flex-col items-center gap-2"
      role="status"
      aria-live="polite"
    >
      {toasts.map((toast) => (
        <ToastItem key={toast.id} toast={toast} onRemove={onRemove} />
      ))}
    </div>
  );
}
