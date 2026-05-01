"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

interface DiscardChangesDialogProps {
  open: boolean;
  onDiscard: () => void;
  onCancel: () => void;
}

export function DiscardChangesDialog({
  open,
  onDiscard,
  onCancel,
}: DiscardChangesDialogProps) {
  return (
    <AlertDialog open={open}>
      <AlertDialogContent size="sm" data-testid="discard-changes-dialog">
        <AlertDialogHeader>
          <AlertDialogTitle>変更を破棄しますか？</AlertDialogTitle>
          <AlertDialogDescription>
            編集中の内容は保存されません。
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel
            onClick={onCancel}
            data-testid="discard-cancel-button"
          >
            編集を続ける
          </AlertDialogCancel>
          <AlertDialogAction
            variant="destructive"
            onClick={onDiscard}
            data-testid="discard-confirm-button"
          >
            破棄
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
