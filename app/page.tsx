"use client";

import { Plus } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { Header } from "@/components/layout/Header";
import { NurseryList } from "@/components/nursery/NurseryList";
import { OnboardingDialog } from "@/components/onboarding/OnboardingDialog";
import { Button } from "@/components/ui/button";
import { useNurseryStore } from "@/stores/nurseryStore";

export default function Home() {
	const nurseries = useNurseryStore((s) => s.nurseries);
	const hasSeenOnboarding = useNurseryStore((s) => s.hasSeenOnboarding);
	const setOnboardingSeen = useNurseryStore((s) => s.setOnboardingSeen);

	const [showOnboarding, setShowOnboarding] = useState(!hasSeenOnboarding);
	const [showHelp, setShowHelp] = useState(false);

	const handleOnboardingClose = () => {
		setShowOnboarding(false);
		setOnboardingSeen();
	};

	return (
		<>
			<Header onHelpClick={() => setShowHelp(true)} />

			<main className="mx-auto max-w-lg px-4 py-6">
				<div className="mb-6 flex items-center justify-between">
					<h2 className="font-bold text-xl">園一覧</h2>
					<Button asChild size="sm">
						<Link href="/add">
							<Plus className="mr-1 h-4 w-4" />
							園を追加する
						</Link>
					</Button>
				</div>

				<NurseryList nurseries={nurseries} />
			</main>

			<OnboardingDialog open={showOnboarding} onClose={handleOnboardingClose} />

			<OnboardingDialog open={showHelp} onClose={() => setShowHelp(false)} />
		</>
	);
}
