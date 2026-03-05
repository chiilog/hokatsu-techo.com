"use client";

import { Pencil } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import type { Nursery } from "@/types/nursery";

interface NurseryDetailProps {
	nursery: Nursery;
	onUpdate: (updates: Partial<Omit<Nursery, "id" | "createdAt">>) => void;
	onVisitTipsClick: () => void;
}

export function NurseryDetail({
	nursery,
	onUpdate,
	onVisitTipsClick,
}: NurseryDetailProps) {
	const [editingField, setEditingField] = useState<
		"name" | "visitDate" | "memo" | null
	>(null);
	const [editName, setEditName] = useState(nursery.name);
	const [editDate, setEditDate] = useState(nursery.visitDate ?? "");
	const [editMemo, setEditMemo] = useState(nursery.memo);
	const [nameError, setNameError] = useState("");

	const startEdit = (field: "name" | "visitDate" | "memo") => {
		setEditingField(field);
		setEditName(nursery.name);
		setEditDate(nursery.visitDate ?? "");
		setEditMemo(nursery.memo);
		setNameError("");
	};

	const saveName = () => {
		if (editName.trim().length === 0) {
			setNameError("園名を入力してください");
			return;
		}
		onUpdate({ name: editName.trim() });
		setEditingField(null);
	};

	const saveDate = () => {
		onUpdate({ visitDate: editDate || null });
		setEditingField(null);
	};

	const saveMemo = () => {
		onUpdate({ memo: editMemo });
		setEditingField(null);
	};

	const cancel = () => {
		setEditingField(null);
		setNameError("");
	};

	const formattedDate = nursery.visitDate
		? new Date(nursery.visitDate).toLocaleDateString("ja-JP")
		: "未定";

	return (
		<div className="space-y-6" data-testid="nursery-detail">
			{/* 園名 */}
			<div className="space-y-2">
				<Label>園名</Label>
				{editingField === "name" ? (
					<div className="space-y-2">
						<Input
							value={editName}
							onChange={(e) => {
								setEditName(e.target.value);
								setNameError("");
							}}
							data-testid="edit-name-input"
						/>
						{nameError && (
							<p className="text-destructive text-sm" data-testid="name-error">
								{nameError}
							</p>
						)}
						<div className="flex gap-2">
							<Button
								size="sm"
								onClick={saveName}
								data-testid="save-name-button"
							>
								保存
							</Button>
							<Button size="sm" variant="outline" onClick={cancel}>
								キャンセル
							</Button>
						</div>
					</div>
				) : (
					<div className="flex items-center justify-between">
						<p className="font-medium text-lg" data-testid="nursery-name">
							{nursery.name}
						</p>
						<Button
							variant="ghost"
							size="sm"
							onClick={() => startEdit("name")}
							aria-label="園名を編集"
							data-testid="edit-name-button"
						>
							<Pencil className="mr-1 h-4 w-4" />
							編集
						</Button>
					</div>
				)}
			</div>

			{/* 見学日 */}
			<div className="space-y-2">
				<Label>見学日</Label>
				{editingField === "visitDate" ? (
					<div className="space-y-2">
						<Input
							type="date"
							value={editDate}
							onChange={(e) => setEditDate(e.target.value)}
							data-testid="edit-date-input"
						/>
						<p className="text-muted-foreground text-xs">
							空にすると「未定」になります
						</p>
						<div className="flex gap-2">
							<Button
								size="sm"
								onClick={saveDate}
								data-testid="save-date-button"
							>
								保存
							</Button>
							<Button size="sm" variant="outline" onClick={cancel}>
								キャンセル
							</Button>
						</div>
					</div>
				) : (
					<div className="flex items-center justify-between">
						<p data-testid="visit-date">{formattedDate}</p>
						<Button
							variant="ghost"
							size="sm"
							onClick={() => startEdit("visitDate")}
							aria-label="見学日を編集"
							data-testid="edit-date-button"
						>
							<Pencil className="mr-1 h-4 w-4" />
							編集
						</Button>
					</div>
				)}
			</div>

			{/* メモ */}
			<div className="space-y-2">
				<div className="flex items-center justify-between">
					<Label>メモ</Label>
					{editingField !== "memo" && (
						<Button
							variant="ghost"
							size="sm"
							onClick={() => startEdit("memo")}
							aria-label="メモを編集"
							data-testid="edit-memo-button"
						>
							<Pencil className="mr-1 h-4 w-4" />
							編集
						</Button>
					)}
				</div>
				{editingField === "memo" ? (
					<div className="space-y-2">
						<Textarea
							value={editMemo}
							onChange={(e) => setEditMemo(e.target.value)}
							placeholder="気づいたことを自由に書けます"
							rows={6}
							data-testid="edit-memo-textarea"
						/>
						<div className="flex gap-2">
							<Button
								size="sm"
								onClick={saveMemo}
								data-testid="save-memo-button"
							>
								保存
							</Button>
							<Button size="sm" variant="outline" onClick={cancel}>
								キャンセル
							</Button>
						</div>
					</div>
				) : (
					<div data-testid="memo-display">
						{nursery.memo ? (
							<p className="whitespace-pre-wrap text-sm">{nursery.memo}</p>
						) : (
							<p className="text-muted-foreground text-sm">
								気づいたことを自由に書けます
							</p>
						)}
					</div>
				)}
			</div>

			{/* 見学のコツリンク */}
			<div>
				<Button
					variant="link"
					onClick={onVisitTipsClick}
					className="px-0"
					data-testid="visit-tips-link"
				>
					見学のコツを見る
				</Button>
			</div>
		</div>
	);
}
