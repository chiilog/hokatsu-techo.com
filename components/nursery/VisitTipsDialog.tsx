"use client";

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

interface VisitTipsDialogProps {
  open: boolean;
  onClose: () => void;
}

const VISIT_TIPS = [
  {
    title: "園の雰囲気を感じる",
    description:
      "先生と子どもたちの関わり方、子どもたちの表情をよく観察しましょう。",
  },
  {
    title: "設備・安全面をチェック",
    description:
      "園庭の広さ、遊具の安全性、防災対策、セキュリティなどを確認しましょう。",
  },
  {
    title: "生活リズムを確認",
    description:
      "給食の内容、お昼寝の環境、1日のスケジュールを聞いてみましょう。",
  },
];

export function VisitTipsDialog({ open, onClose }: VisitTipsDialogProps) {
  return (
    <Dialog open={open} onOpenChange={(isOpen) => !isOpen && onClose()}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>見学のコツ</DialogTitle>
          <DialogDescription>
            見学で注目するポイントをまとめました
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-3.5 py-2">
          {VISIT_TIPS.map((tip, index) => (
            <div key={tip.title} className="flex gap-3">
              <IconCircle
                className="size-6 font-bold text-primary text-xs"
                aria-hidden="true"
              >
                {index + 1}
              </IconCircle>
              <div className="space-y-1">
                <h3 className="font-bold text-sm">{tip.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {tip.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        <DialogFooter>
          <Button
            onClick={onClose}
            className="w-full"
            aria-label="見学のコツを閉じる"
          >
            閉じる
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
