"use client";

import { CircleHelp } from "lucide-react";
import { AppLogo } from "@/components/layout/AppLogo";
import { ThemeToggle } from "@/components/layout/ThemeToggle";
import { Button } from "@/components/ui/button";

interface HeaderProps {
  onHelpClick: () => void;
}

export function Header({ onHelpClick }: HeaderProps) {
  return (
    <header className="sticky top-0 z-10 border-b bg-secondary">
      <div className="flex items-center justify-between px-4 py-3">
        <div className="flex items-center gap-2">
          <AppLogo />
          <h1 className="font-bold text-lg text-secondary-foreground">
            保活手帳
          </h1>
        </div>
        <div className="flex items-center gap-1">
          <ThemeToggle />
          <Button
            variant="ghost"
            size="icon"
            onClick={onHelpClick}
            aria-label="ヘルプ"
          >
            <CircleHelp className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </header>
  );
}
