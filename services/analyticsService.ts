declare global {
  interface Window {
    clarity: (...args: unknown[]) => void;
  }
}

const CLARITY_PROJECT_ID = process.env.NEXT_PUBLIC_CLARITY_PROJECT_ID ?? "";

export function initClarity(): void {
  if (!CLARITY_PROJECT_ID || typeof window === "undefined") return;
  if (!/^[a-z0-9]+$/i.test(CLARITY_PROJECT_ID)) return;
  if (document.querySelector('script[src*="clarity.ms"]')) return;

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
