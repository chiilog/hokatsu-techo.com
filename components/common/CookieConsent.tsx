"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useCookieConsent } from "@/hooks/useCookieConsent";
import { initAnalytics } from "@/services/analyticsService";

export function CookieConsent() {
	const { isUndecided, isAccepted, accept, decline } = useCookieConsent();

	useEffect(() => {
		if (isAccepted) {
			initAnalytics();
		}
	}, [isAccepted]);

	if (!isUndecided) return null;

	return (
		<div
			className="fixed inset-x-0 bottom-0 z-50 border-t bg-background p-4 shadow-lg"
			data-testid="cookie-consent-banner"
		>
			<div className="mx-auto max-w-lg">
				<p className="mb-3 text-sm">
					このアプリではサービス向上のためにCookieを使用しています。アクセス解析（Google
					Analytics、Microsoft
					Clarity）にのみ使用し、入力された園の情報は送信しません。
				</p>
				<div className="flex gap-2">
					<Button size="sm" onClick={accept} data-testid="cookie-accept-button">
						同意する
					</Button>
					<Button
						size="sm"
						variant="outline"
						onClick={decline}
						data-testid="cookie-decline-button"
					>
						同意しない
					</Button>
				</div>
			</div>
		</div>
	);
}
