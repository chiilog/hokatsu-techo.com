"use client";

import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { NurseryForm } from "@/components/nursery/NurseryForm";
import { Button } from "@/components/ui/button";
import { useNurseryStore } from "@/stores/nurseryStore";

export default function AddNurseryPage() {
	const router = useRouter();
	const addNursery = useNurseryStore((s) => s.addNursery);

	const handleAdd = (name: string, visitDate: string | null) => {
		addNursery(name, visitDate);
		router.push("/");
	};

	return (
		<>
			<header className="sticky top-0 z-10 border-b bg-background">
				<div className="flex items-center gap-2 px-4 py-3">
					<Button variant="ghost" size="icon" asChild>
						<Link href="/" aria-label="戻る">
							<ArrowLeft className="h-5 w-5" />
						</Link>
					</Button>
					<h1 className="font-bold text-lg">園を追加する</h1>
				</div>
			</header>

			<main className="mx-auto max-w-lg px-4 py-6">
				<NurseryForm onAdd={handleAdd} />
			</main>
		</>
	);
}
