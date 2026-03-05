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

interface DeleteNurseryDialogProps {
	open: boolean;
	nurseryName: string;
	onConfirm: () => void;
	onCancel: () => void;
}

export function DeleteNurseryDialog({
	open,
	nurseryName,
	onConfirm,
	onCancel,
}: DeleteNurseryDialogProps) {
	return (
		<AlertDialog open={open} onOpenChange={(isOpen) => !isOpen && onCancel()}>
			<AlertDialogContent data-testid="delete-nursery-dialog">
				<AlertDialogHeader>
					<AlertDialogTitle>この園を削除しますか？</AlertDialogTitle>
					<AlertDialogDescription>
						「{nurseryName}」を削除します。この操作は取り消せません。
					</AlertDialogDescription>
				</AlertDialogHeader>
				<AlertDialogFooter>
					<AlertDialogCancel data-testid="delete-cancel-button">
						キャンセル
					</AlertDialogCancel>
					<AlertDialogAction
						onClick={onConfirm}
						variant="destructive"
						data-testid="delete-confirm-button"
					>
						削除
					</AlertDialogAction>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	);
}
