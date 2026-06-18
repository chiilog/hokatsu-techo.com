"use client";

import { GoogleAnalytics } from "@next/third-parties/google";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useCookieConsent } from "@/hooks/useCookieConsent";
import { initClarity } from "@/services/analyticsService";

const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID ?? "";

export function CookieConsent() {
  const { isUndecided, isAccepted, accept, decline } = useCookieConsent();

  useEffect(() => {
    if (isAccepted) {
      initClarity();
    }
  }, [isAccepted]);

  return (
    <>
      {isAccepted && GA_MEASUREMENT_ID && (
        <GoogleAnalytics gaId={GA_MEASUREMENT_ID} />
      )}
      {isUndecided && (
        <div
          role="dialog"
          aria-label="Cookie使用の同意"
          className="fixed inset-x-0 bottom-0 z-50 border-t bg-background p-4 shadow-lg"
        >
          <div className="mx-auto max-w-lg">
            <p className="mb-3 text-sm">
              このアプリではサービス向上のためにCookieを使用しています。アクセス解析（Google
              Analytics、Microsoft
              Clarity）にのみ使用し、入力された園の情報は送信しません。
            </p>
            <div className="flex gap-2">
              <Button size="sm" onClick={accept}>
                同意する
              </Button>
              <Button size="sm" variant="outline" onClick={decline}>
                同意しない
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
