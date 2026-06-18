"use client";

import { useCallback, useState } from "react";

export interface Toast {
  id: string;
  message: string;
  type: "success" | "error";
}

interface UseToastReturn {
  toasts: Toast[];
  showToast: (
    message: string,
    options?: { type?: "success" | "error" },
  ) => void;
  removeToast: (id: string) => void;
}

export function useToast(): UseToastReturn {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const showToast = useCallback(
    (message: string, options?: { type?: "success" | "error" }) => {
      const id = crypto.randomUUID();
      const type = options?.type ?? "success";
      setToasts((prev) => [...prev, { id, message, type }]);
    },
    [],
  );

  return { toasts, showToast, removeToast };
}
