"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useNurseryStore } from "@/stores/nurseryStore";

export function NurseryForm() {
	const router = useRouter();
	const addNursery = useNurseryStore((s) => s.addNursery);

	const [name, setName] = useState("");
	const [visitDate, setVisitDate] = useState("");

	const isValid = name.trim().length > 0;

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		if (!isValid) return;

		addNursery(name, visitDate || null);
		router.push("/");
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
				<Label htmlFor="visit-date">見学日（任意）</Label>
				<Input
					id="visit-date"
					type="date"
					value={visitDate}
					onChange={(e) => setVisitDate(e.target.value)}
					data-testid="visit-date-input"
				/>
				<p className="text-muted-foreground text-xs">
					未入力の場合は「未定」になります
				</p>
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
