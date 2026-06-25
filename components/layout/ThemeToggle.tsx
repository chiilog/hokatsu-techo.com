"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

// ライト⇄ダークを手動で切り替えるトグル。OS設定（system）にも追従する
export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // サーバー描画時はテーマが未確定のため、マウント後にのみ実アイコンを表示し
  // ハイドレーション不一致を避ける
  useEffect(() => {
    setMounted(true);
  }, []);

  const isDark = mounted && resolvedTheme === "dark";

  return (
    <Button
      size="icon"
      variant="ghost"
      disabled={!mounted}
      onClick={() => setTheme(isDark ? "light" : "dark")}
      aria-label={isDark ? "ライトモードに切り替え" : "ダークモードに切り替え"}
    >
      {isDark ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
    </Button>
  );
}
