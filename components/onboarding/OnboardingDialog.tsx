"use client";

import { Check } from "lucide-react";
import { IconCircle } from "@/components/layout/IconCircle";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface OnboardingDialogProps {
  open: boolean;
  onClose: () => void;
}

const FEATURES = [
  "見学候補の園をリストアップ",
  "見学日を記録",
  "見学で気づいたことをメモ",
  "あとから一覧で見返す",
];

export function OnboardingDialog({ open, onClose }: OnboardingDialogProps) {
  return (
    <Dialog open={open} onOpenChange={(isOpen) => !isOpen && onClose()}>
      <DialogContent
        showCloseButton={false}
        onOpenAutoFocus={(e) => e.preventDefault()}
      >
        <DialogHeader>
          <DialogTitle>保活手帳へようこそ</DialogTitle>
          <DialogDescription>
            保育園の見学記録をかんたんに管理できるアプリです
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-2">
          <div className="space-y-2.5">
            <h3 className="font-bold text-sm">できること</h3>
            <ul className="space-y-2">
              {FEATURES.map((feature) => (
                <li
                  key={feature}
                  className="flex items-center gap-2.5 text-foreground text-sm"
                >
                  <IconCircle className="size-5">
                    <Check
                      className="size-3 stroke-3 text-primary"
                      aria-hidden="true"
                    />
                  </IconCircle>
                  {feature}
                </li>
              ))}
            </ul>
          </div>

          <p className="rounded-md bg-muted px-3.5 py-3 text-muted-foreground text-sm leading-relaxed">
            すべてのデータはお使いの端末（ブラウザ）に保存されます。サーバーへの送信は行いません。
          </p>
        </div>

        <DialogFooter>
          <Button onClick={onClose} size="lg" className="w-full">
            はじめる
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
