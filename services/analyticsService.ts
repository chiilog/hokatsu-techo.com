declare global {
	interface Window {
		dataLayer: unknown[];
		gtag: (...args: unknown[]) => void;
		clarity: (...args: unknown[]) => void;
	}
}

const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID ?? "";
const CLARITY_PROJECT_ID = process.env.NEXT_PUBLIC_CLARITY_PROJECT_ID ?? "";

export function initGA4(): void {
	if (!GA_MEASUREMENT_ID || typeof window === "undefined") return;

	window.dataLayer = window.dataLayer || [];
	window.gtag = function gtag(...args: unknown[]) {
		window.dataLayer.push(args);
	};
	window.gtag("js", new Date());
	window.gtag("config", GA_MEASUREMENT_ID, {
		send_page_view: true,
	});

	const script = document.createElement("script");
	script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
	script.async = true;
	document.head.appendChild(script);
}

export function initClarity(): void {
	if (!CLARITY_PROJECT_ID || typeof window === "undefined") return;

	const script = document.createElement("script");
	script.innerHTML = `
		(function(c,l,a,r,i,t,y){
			c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
			t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
			y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
		})(window, document, "clarity", "script", "${CLARITY_PROJECT_ID}");
	`;
	document.head.appendChild(script);
}

export function initAnalytics(): void {
	initGA4();
	initClarity();
}
