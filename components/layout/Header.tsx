"use client";

import { CircleHelp } from "lucide-react";
import { Button } from "@/components/ui/button";

interface HeaderProps {
	onHelpClick: () => void;
}

export function Header({ onHelpClick }: HeaderProps) {
	return (
		<header className="sticky top-0 z-10 border-b bg-background">
			<div className="flex items-center justify-between px-4 py-3">
				<h1 className="font-bold text-lg">保活手帳</h1>
				<Button
					variant="ghost"
					size="icon"
					onClick={onHelpClick}
					aria-label="ヘルプ"
					data-testid="header-help-button"
				>
					<CircleHelp className="h-5 w-5" />
				</Button>
			</div>
		</header>
	);
}
