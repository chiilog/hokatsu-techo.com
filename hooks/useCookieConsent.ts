"use client";

import { useCallback, useEffect, useState } from "react";

const CONSENT_KEY = "hokatsu-techo-cookie-consent";

type ConsentStatus = "undecided" | "accepted" | "declined";

export function useCookieConsent() {
	const [consent, setConsent] = useState<ConsentStatus>("undecided");

	useEffect(() => {
		const stored = localStorage.getItem(CONSENT_KEY);
		if (stored === "accepted" || stored === "declined") {
			setConsent(stored);
		}
	}, []);

	const accept = useCallback(() => {
		localStorage.setItem(CONSENT_KEY, "accepted");
		setConsent("accepted");
	}, []);

	const decline = useCallback(() => {
		localStorage.setItem(CONSENT_KEY, "declined");
		setConsent("declined");
	}, []);

	return {
		consent,
		isUndecided: consent === "undecided",
		isAccepted: consent === "accepted",
		accept,
		decline,
	};
}
