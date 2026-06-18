"use client";

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

export function OnboardingDialog({ open, onClose }: OnboardingDialogProps) {
  return (
    <Dialog open={open} onOpenChange={(isOpen) => !isOpen && onClose()}>
      <DialogContent showCloseButton={false}>
        <DialogHeader>
          <DialogTitle>保活手帳へようこそ</DialogTitle>
          <DialogDescription>
            保育園の見学記録をかんたんに管理できるアプリです
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-2">
          <div className="space-y-2">
            <h3 className="font-medium text-sm">できること</h3>
            <ul className="list-disc space-y-1 pl-5 text-muted-foreground text-sm">
              <li>見学候補の園をリストアップ</li>
              <li>見学日を記録</li>
              <li>見学で気づいたことをメモ</li>
              <li>あとから一覧で見返す</li>
            </ul>
          </div>

          <div className="space-y-2">
            <h3 className="font-medium text-sm">データの保存について</h3>
            <p className="text-muted-foreground text-sm">
              すべてのデータはお使いの端末（ブラウザ）に保存されます。サーバーへの送信は行いません。
            </p>
          </div>
        </div>

        <DialogFooter>
          <Button onClick={onClose} className="w-full">
            はじめる
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
